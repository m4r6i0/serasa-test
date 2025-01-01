
# controllers/debts.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.configurations.database import SessionLocal
from app.services.debt_service import create_debt, list_debts, update_debt, delete_debt
from app.dto.debt_dto import DebtCreate, DebtResponse

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
@router.post("/create", response_model=DebtResponse)
def create_debt_route(debt: DebtCreate, db: Session = Depends(get_db)):
    return create_debt(db, debt)

@router.get("/list", response_model=list[DebtResponse])
def list_debts_route(db: Session = Depends(get_db)):
    return list_debts(db)

@router.put("/update/{debt_id}", response_model=DebtResponse)
def update_debt_route(debt_id: int, debt: DebtCreate, db: Session = Depends(get_db)):
    return update_debt(db, debt_id, debt)

@router.delete("/delete/{debt_id}")
def delete_debt_route(debt_id: int, db: Session = Depends(get_db)):
    return delete_debt(db, debt_id)