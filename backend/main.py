from starlette.middleware.cors import CORSMiddleware

from app.routes.users import router as user_router
from app.routes.debts import router as debt_router
from app.configurations.database import create_db_and_tables
from app.configurations.settings import settings

from fastapi import FastAPI

app = FastAPI(title="Gestão de Dívidas Pessoais")

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8082"],  # Substitua pelo domínio do frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluindo as rotas
app.include_router(user_router, prefix="/users", tags=["Users"])
app.include_router(debt_router, prefix="/debts", tags=["Debts"])

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/")
def read_root():
    return {"message": "Bem-vindo à API de Gestão SERASA"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=True
    )
