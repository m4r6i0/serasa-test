# services/debt_service.py
from sqlalchemy.orm import Session
from app.models.debt import Debt
from fastapi import HTTPException

def create_debt(db: Session, title: str, amount: float, due_date, status: str, notes: str, owner_id: int):
    new_debt = Debt(
        title=title,
        amount=amount,
        due_date=due_date,
        status=status,
        notes=notes,
        owner_id=owner_id
    )
    db.add(new_debt)
    db.commit()
    db.refresh(new_debt)
    return new_debt

def list_debts(db: Session):
    return db.query(Debt).all()

def update_debt(db: Session, debt_id: int, title: str, amount: float, due_date, status: str, notes: str):
    existing_debt = db.query(Debt).filter(Debt.id == debt_id).first()
    if not existing_debt:
        raise HTTPException(status_code=404, detail="Dívida não encontrada")
    existing_debt.title = title
    existing_debt.amount = amount
    existing_debt.due_date = due_date
    existing_debt.status = status
    existing_debt.notes = notes
    db.commit()
    db.refresh(existing_debt)
    return existing_debt

def delete_debt(db: Session, debt_id: int):
    existing_debt = db.query(Debt).filter(Debt.id == debt_id).first()
    if not existing_debt:
        raise HTTPException(status_code=404, detail="Dívida não encontrada")
    db.delete(existing_debt)
    db.commit()
    return {"detail": "Dívida removida com sucesso"}