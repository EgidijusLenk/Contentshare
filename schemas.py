from importlib.resources import contents
from typing import List, Optional

from pydantic import BaseModel

#Content schemas:

class Content(BaseModel):
    id: Optional[int] = None
    owner_id: Optional[int] = None
    content_url: str
    content_metadata: Optional[str] = None
    shortened_url: str
    backbutton_url: Optional[str] = None
    display_ad_url: Optional[str] = None
    click_count: Optional[int] = None #need function to update count when receives traffic
    active: bool

    class Config:
        orm_mode = True

class ContentCreate(BaseModel):
    owner_id: Optional[int] = None
    content_url: str
    content_metadata: Optional[str] = None # need function to autoscrape metadata
    shortened_url: Optional[str] = None
    backbutton_url: Optional[str] = None
    display_ad_url: Optional[str] = None

class ContentUpdate(BaseModel):
    content_url: Optional[str] = None
    backbutton_url: Optional[str] = None
    display_ad_url: Optional[str] = None
    active: Optional[bool] = None
    class Config:
        orm_mode = True


class ContentState(BaseModel): #got to check if current user is creator if this content
    active: bool

#User schemas:

class UserCreate(BaseModel):
    user: str
    email: str
    password: str

class UserRead(BaseModel): 
    id: int
    user: Optional[str] = None
    email: str
    hashed_password: Optional[str] = None
    active: bool
    contents: List[Content] = []

    class Config:
        orm_mode = True


class UserUpdate(BaseModel): #for use with @app.patch method
    user: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None

class UserState(BaseModel):
    active: bool
    

