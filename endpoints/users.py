from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException
from sqlmodel import Field, Session, SQLModel, create_engine, select

from database import get_session
import crud
from models.models import Users, UserRead, UserCreate, UserState, UserUpdate
router = APIRouter()

@router.post("/users/", response_model=UserRead)
def create_hero(*, db: Session = Depends(get_session), user: UserCreate):
    db_user = Users.from_orm(user)
    print("user")
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    # user = crud.CrudUser.create(db=session,db_user=db_user)
    
    return db_user

#CIA SUSTOJAU!^^
