from typing import Any, Dict, Optional, Union

from fastapi import Depends, HTTPException
from pydantic import BaseModel
from sqlmodel import Field, Session, SQLModel, create_engine, select

from security import get_password_hash, verify_password




class CrudUser(BaseModel):
    def __init__(__pydantic_self__, **data: Any) -> None:
        super().__init__(**data)

    def create(self, db: Session, )
    