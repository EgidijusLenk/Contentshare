from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException
from sqlmodel import Field, Session, SQLModel, create_engine, select

from database import get_session
from .. import crud
from ..models.users import Users, UserRead, UserCreate, UserState, UserUpdate
router = APIRouter()

@router.post("/users/", response_model=UserRead)
def create_hero(*, session: Session = Depends(get_session), user: UserCreate):
    db_user = Users.from_orm(user)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user

#CIA SUSTOJAU!^^