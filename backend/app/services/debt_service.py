# services/debt_service.py
from datetime import datetime

from sqlalchemy.orm import Session

from app.dto import DebtCreate, DebtResponse
from app.models import User
from app.models.debt import Debt
from fastapi import HTTPException


def create_debt(db: Session, debt: DebtCreate, current_user: User):
    # Remove espaços extras do título
    title = debt.title.strip()

    # Verifica se já existe uma dívida com o mesmo título (case insensitive)
    existing_debt = db.query(Debt).filter(Debt.title.ilike(f"%{title}%"),
                                          Debt.owner_id == current_user.id).first()
    if existing_debt:
        raise HTTPException(
            status_code=400,
            detail=f"Dívida com o título '{title}' já existe."
        )

    # Cria e salva a nova dívida
    new_debt = Debt(
        title=title,
        amount=debt.amount,
        due_date=debt.due_date,
        status=debt.status,
        notes=debt.notes,
        owner_id=current_user.id
    )
    db.add(new_debt)
    db.commit()
    db.refresh(new_debt)

    return DebtResponse(
        id=new_debt.id,
        title=new_debt.title,
        amount=new_debt.amount,
        due_date=new_debt.due_date,
        status=new_debt.status,
        notes=new_debt.notes
    )


def list_debts(current_user: User, db: Session):
    debts = db.query(Debt).filter(Debt.owner_id == current_user.id).all()
    return debts


def get_debt_by_id(debt_id: int, db: Session):
    existing_debt = db.query(Debt).filter(Debt.id == debt_id).first()
    if not existing_debt:
        raise HTTPException(status_code=404, detail="Dívida não encontrada")
    return existing_debt


def update_debt(db: Session, debt_id: int, debt: DebtCreate):
    existing_debt = db.query(Debt).filter(Debt.id == debt_id).first()
    if not existing_debt:
        raise HTTPException(status_code=404, detail="Dívida não encontrada")
    existing_debt.title = debt.title
    existing_debt.amount = debt.amount
    existing_debt.due_date = debt.due_date
    existing_debt.status = debt.status
    existing_debt.notes = debt.notes
    #existing_debt.owner_id = user_id
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
