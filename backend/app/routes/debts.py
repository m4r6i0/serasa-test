
# routes/debts.py
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

@router.get("/list", response_model=list[DebtResponse])
def list_debts(db: Session = Depends(get_db)):
    debts = db.query(Debt).all()
    return debts

@router.put("/update/{debt_id}", response_model=DebtResponse)
def update_debt(debt_id: int, debt: DebtCreate, db: Session = Depends(get_db)):
    existing_debt = db.query(Debt).filter(Debt.id == debt_id).first()
    if not existing_debt:
        raise HTTPException(status_code=404, detail="Dívida não encontrada")
    existing_debt.title = debt.title
    existing_debt.amount = debt.amount
    existing_debt.due_date = debt.due_date
    existing_debt.status = debt.status
    existing_debt.notes = debt.notes
    db.commit()
    db.refresh(existing_debt)
    return existing_debt

@router.delete("/delete/{debt_id}")
def delete_debt(debt_id: int, db: Session = Depends(get_db)):
    existing_debt = db.query(Debt).filter(Debt.id == debt_id).first()
    if not existing_debt:
        raise HTTPException(status_code=404, detail="Dívida não encontrada")
    db.delete(existing_debt)
    db.commit()
    return {"detail": "Dívida removida com sucesso"}
