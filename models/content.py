from typing import Any, Dict, Optional, Union

from sqlmodel import Field, SQLModel


class Content(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user: Optional[int] = None
    content_url: str
    content_metadata: Optional[str] = None
    shortened_url: str
    backbutton_url: Optional[str] = None
    display_ad_url: Optional[str] = None
    click_count: Optional[int] = None #need function to update count when receives traffic
    active: int #0 or 1. On real db change to bolean 

class ContentCreate(SQLModel):
    user: Optional[int] = None
    content_url: str
    content_metadata: Optional[str] = None # need function to autoscrape metadata
    shortened_url: Optional[str] = None
    backbutton_url: Optional[str] = None
    display_ad_url: Optional[str] = None

class ContentUpdate(SQLModel):
    content_url: str
    backbutton_url: Optional[str] = None
    display_ad_url: Optional[str] = None

class ContentState(SQLModel): #got to chech if current user is creator if this content
    active: int #0 or 1. On real db change to bolean
