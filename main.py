from typing import Dict, List


from fastapi import Depends, FastAPI, HTTPException, status
from sqlalchemy.orm import Session

import crud, models, schemas
from database import SessionLocal, engine

app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


#---security
import secrets

from datetime import datetime, timedelta
from typing import Any, Union
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from jose import jwt


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')

ALGORITHM = "HS256"
SECRET_KEY: str = "secretkey" #secrets.token_urlsafe(32)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)



def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)



def authenticate_user(username:str, password:str, db):
    user:schemas.UserRead = crud.get_user(db=db, username=username)
    print(f"\n\nuserdata:\n {user.user} \n\n")
    if not user:
        print("\n\nno such username\n\n")
        return False
    if not verify_password(password, user.hashed_password): # cia paduot passworda ir hash?
        print("\n\npasswords dont match\n\n")
        return False
    return user

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
        user: schemas.UserRead= crud.get_user_by_id(db, payload.get("id"))
    except:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    return user

@app.post('/token')
async def generate_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user: schemas.UserRead = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token = jwt.encode({"id": user.id, "user": user.user}, SECRET_KEY, algorithm=ALGORITHM)
    return {"access_token": token, "token_type": "bearer"}




@app.get("/users/me", response_model=schemas.UserRead)
async def get_user(user: schemas.UserRead = Depends(get_current_user)):
    #tai cia jau turiu esamo vartotojo objekta, o "Depends(get_current_user)" galiu pernaudot kitiems endpointams
    return user
    
@app.get("/")
async def index(token: str = Depends(oauth2_scheme)):
    return {'the_token' : token}






#---/security




@app.post("/users/", response_model=schemas.UserRead)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    print(f"\n \n \n username is: {user}\n \n")
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    user.password = get_password_hash(user.password) #hashing the password
    return crud.create_user(db=db, user=user)



@app.post("/content/", response_model=schemas.Content)
def create_content(item: schemas.ContentCreate, db: Session = Depends(get_db)):
    #gotto add function to check if users is the creator
    return crud.create_user_item(db=db, item=item)