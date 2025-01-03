from urllib.request import Request

from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from fastapi import HTTPException, Depends
from app.models.user import User
from app.configurations.settings import settings  # Suas configurações (JWT_SECRET, etc.)

# Define o esquema OAuth2 para capturar o token do header
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends()):
    """
    Valida o token JWT e retorna o usuário autenticado.
    """
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Token inválido")

        user = db.query(User).filter(User.email == user_id).first()
        if user is None:
            raise HTTPException(status_code=401, detail="Usuário não encontrado")
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido ou expirado")


# def get_current_user(request: Request, db: Session = Depends()):
#     """
#     Valida o token JWT e retorna o usuário autenticado.
#     """
#     try:
#         token = request.headers.get("Authorization").split(" ")[1]
#         payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
#         user_id = payload.get("sub")
#         if user_id is None:
#             raise HTTPException(status_code=401, detail="Token inválido")
#
#         user = db.query(User).filter(User.id == user_id).first()
#         if user is None:
#             raise HTTPException(status_code=401, detail="Usuário não encontrado")
#         return user
#     except JWTError:
#         raise HTTPException(status_code=401, detail="Token inválido ou expirado")
