from sqlalchemy.orm import Session
from fastapi import HTTPException, status
import models
import schemas


def get_user_by_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user(db: Session, username: int):
    return db.query(models.User).filter(models.User.user == username).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(user=user.user, email=user.email,
                          hashed_password=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Content).offset(skip).limit(limit).all()


def create_user_item(db: Session, item: schemas.ContentCreate):
    db_item = models.Content(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


def get_content_by_shortened_url(db: Session, shortened_url):
    item: models.Content = db.query(models.Content).filter(
        models.Content.shortened_url == shortened_url).first()
    if item:
        if item.active == True:
            return item
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="item not found, check link")


def update_item(item_id: str, item: schemas.ContentUpdate, db: Session, user: schemas.UserRead):
    stored_item: models.Content = db.query(models.Content).filter(
        models.Content.id == item_id).first()
    if stored_item.owner_id != user.id:  # checking if current user is item owner
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    for var, value in vars(item).items():
        setattr(stored_item, var, value) if value or str(
            value) == 'False' else None
    db.add(stored_item)
    db.commit()
    db.refresh(stored_item)
    return stored_item
