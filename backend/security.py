import secrets

from datetime import datetime, timedelta
from typing import Any, Union
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from jose import jwt
from sqlalchemy.orm import Session
import crud
import models
import schemas
from fastapi import Depends, HTTPException, status
from database import get_db

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')

ALGORITHM = "HS256"
SECRET_KEY: str = "secretkey"  # secrets.token_urlsafe(32)


def create_token(user: schemas.UserRead):
    token = jwt.encode({"id": user.id, "user": user.user},
                       SECRET_KEY, algorithm=ALGORITHM)
    return token


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def authenticate_user(username: str, password: str, db):
    user: schemas.UserRead = crud.get_user(db=db, username=username)
    print(f"\n\nuserdata:\n {user.user} \n\n")
    if not user:
        print("\n\nno such username\n\n")
        return False
    if not verify_password(password, user.hashed_password):
        print("\n\npasswords dont match\n\n")
        return False
    return user


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
        user: schemas.UserRead = crud.get_user_by_id(db, payload.get("id"))
    except:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    return user
