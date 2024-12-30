# configurations/settings.py
from pydantic import BaseSettings

class Settings(BaseSettings):
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    HOST: str = "127.0.0.1"
    PORT: int = 8082

    class Config:
        env_file = ".env"

settings = Settings()