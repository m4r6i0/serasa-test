from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import timedelta
from app.configurations.database import SessionLocal
from app.configurations.settings import settings
from app.dto.user_dto import UserCreate, UserResponse
from app.services.user_service import register_user, authenticate_user, create_access_token

router = APIRouter()

# Dependência para obter o banco de dados
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register", response_model=UserResponse)
def register_user_endpoint(user: UserCreate, db: Session = Depends(get_db)):
    """
    Endpoint para registrar um novo usuário.
    """
    new_user = register_user(db, username=user.username, email=user.email, password=user.password)
    return new_user

@router.get("/login")
def login_user(username: str, password: str, db: Session = Depends(get_db)):
    """
    Endpoint para autenticar um usuário.
    """
    user = authenticate_user(db, username=username, password=password)
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
