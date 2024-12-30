
# controllers/debts.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.configurations.database import SessionLocal
from app.models.debt import Debt
from app.dto.debt_dto import DebtCreate, DebtResponse

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/create", response_model=DebtResponse)
def create_debt(debt: DebtCreate, db: Session = Depends(get_db)):
    new_debt = Debt(
        title=debt.title,
        amount=debt.amount,
        due_date=debt.due_date,
        status=debt.status,
        notes=debt.notes,
        owner_id=1  # Substituir pelo ID do usuário autenticado
    )
    db.add(new_debt)
    db.commit()
    db.refresh(new_debt)
    return new_debt