from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    user = Column(String, index=True)
    email = Column(String, index=True)
    hashed_password = Column(String)
    active = Column(Boolean, default=True)

    contents = relationship("Content", back_populates="owner")

class Content(Base):
    __tablename__ = "contents"
    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))
    content_url = Column(String, nullable=False, index=True)
    content_metadata = Column(String)
    shortened_url = Column(String, nullable=False, index=True)
    backbutton_url = Column(String)
    display_ad_url = Column(String)
    click_count = Column(Integer)
    active = Column(Boolean, default=True)

    owner = relationship("User", back_populates="contents")













