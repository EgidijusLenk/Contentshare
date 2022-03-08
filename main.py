from typing import Dict, List

from fastapi.templating import Jinja2Templates
from fastapi import Depends, FastAPI, Request, HTTPException, status
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
import crud, models, schemas
from database import get_db
from utils import id_generator, get_metadata

templates = Jinja2Templates(directory="templates")
app = FastAPI()

#---security
from security import authenticate_user, create_token, get_current_user, oauth2_scheme, get_password_hash

@app.post('/token')
async def generate_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user: schemas.UserRead = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token = create_token(user)
    return {"access_token": token, "token_type": "bearer"}




@app.get("/users/me", response_model=schemas.UserRead)
async def get_user(user: schemas.UserRead = Depends(get_current_user), db: Session = Depends(get_db)):
    #tai cia jau turiu esamo vartotojo objekta, o "Depends(get_current_user)" galiu pernaudot kitiems endpointams
    
    person: schemas.UserRead = crud.get_user_by_id(db=db, user_id=user.id)
    return person

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
def create_content(item: schemas.ContentCreate, db: Session = Depends(get_db), user: schemas.UserRead = Depends(get_current_user)):
    item.owner_id = user.id
    #gotto make sure shortened url is unique
    item.shortened_url = id_generator() #shortening the url
    item.content_metadata = get_metadata(item.content_url)
    return crud.create_user_item(db=db, item=item)


#return content data prelander

@app.get("/g/{unique_string}", response_class=HTMLResponse)
async def prelander(request: Request, unique_string: str, db: Session = Depends(get_db)):
    content: schemas.Content = crud.get_content_by_shortened_url(db, unique_string)
    # listToStr = ' '.join([str(elem) for elem in metadata_tags])
    print(content)
    return templates.TemplateResponse("item.html", {"request": request, 
    "content_url": content.content_url,
    "metadata_tags": content.content_metadata, 
    "backbutton_url": content.backbutton_url,
    "display_ad_url": content.display_ad_url
    })