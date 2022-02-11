from typing import Optional

from sqlmodel import Field, SQLModel, create_engine, Session, select
from fastapi import Depends, FastAPI, HTTPException, Query

sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

engine = create_engine(sqlite_url, echo=True)

def get_session():
    with Session(engine) as session:
        yield session