from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

# Importando os controladores
from app.controllers.debt import router as debt_controller
from app.controllers.user import router as user_controller
from app.configurations.database import create_db_and_tables
from app.configurations.settings import settings

app = FastAPI(title="Gestão de Dívidas Pessoais")

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8082"],  # Substitua pelo domínio do frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluindo os controladores
app.include_router(user_controller, prefix="/users", tags=["Users"])
app.include_router(debt_controller, prefix="/debts", tags=["Debts"])

@app.on_event("startup")
def on_startup():
    # Criação do banco de dados e tabelas, caso ainda não existam
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
        reload=False
    )
