# services/debt_service.py
from datetime import datetime

from sqlalchemy.orm import Session

from app.dto import DebtCreate
from app.models.debt import Debt
from fastapi import HTTPException

def create_debt(db: Session, debt: DebtCreate):
    print("porra")
    # Remove espaços extras do título
    title = debt.title.strip()

    print(title)

    # Verifica se já existe uma dívida com o mesmo título (case insensitive)
    existing_debt = db.query(Debt).filter(Debt.title.ilike(f"%{title}%")).first()
    if existing_debt:
        raise HTTPException(
            status_code=400,
            detail=f"Dívida com o título '{title}' já existe."
        )

    # Verifica se a data de vencimento é no passado
    try:
        due_date_obj = datetime.strptime(debt.due_date, "%Y-%m-%d")
        if due_date_obj < datetime.now():
            raise HTTPException(
                status_code=400,
                detail="A data de vencimento não pode ser no passado."
            )
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="A data de vencimento deve estar no formato 'YYYY-MM-DD'."
        )

    # Cria e salva a nova dívida
    new_debt = Debt(
        title=title,
        amount=debt.amount,
        due_date=debt.due_date,
        status=debt.status,
        notes=debt.notes,
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