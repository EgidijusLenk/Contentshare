from typing import Any, Dict, Optional, Union

from sqlmodel import Field, SQLModel


class Users(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user: str
    email: str
    hashed_password: str
    active: int #0 or 1. On real db change to bolean 

class UserCreate(SQLModel):
    user: str
    email: str
    password: str

class UserRead(SQLModel): #response_model=UserRead
    id: int
    user: str
    email: str
    active: int #0 or 1. On real db change to bolean 

class UserUpdate(SQLModel): #for use with @app.patch method
    user: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None

class UserState(SQLModel):
    active: int #0 or 1. On real db change to bolean 






















