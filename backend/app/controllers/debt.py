# controllers/debts.py
from urllib.request import Request

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.configurations.database import get_db
from app.models import User
from app.services.debt_service import create_debt, list_debts, update_debt, delete_debt, get_debt_by_id
from app.services.auth_service import get_current_user, oauth2_scheme
from app.dto.debt_dto import DebtCreate, DebtResponse

router = APIRouter()

@router.post("/create", response_model=DebtResponse)
def create_debt_route(debt: DebtCreate,
                      db: Session = Depends(get_db),
                      token: str = Depends(oauth2_scheme)):

    current_user: User = get_current_user(token, db)
    new_debt = create_debt(db, debt, current_user)
    return new_debt


@router.get("/list", response_model=list[DebtResponse])
def list_debts_route(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    current_user: User = get_current_user(token, db)
    all_debts = list_debts(current_user, db)
    return all_debts

@router.get("/get/{debt_id}", response_model=DebtResponse)
def get_debt_id(debt_id: int, db: Session = Depends(get_db)):
    return get_debt_by_id(debt_id, db)


@router.put("/update/{debt_id}", response_model=DebtResponse)
def update_debt_route(debt_id: int,
                      debt: DebtCreate,
                      db: Session = Depends(get_db)):
    #current_user: User = get_current_user(token, db)
    update_data = update_debt(db, debt_id, debt)
    return update_data


@router.delete("/delete/{debt_id}")
def delete_debt_route(debt_id: int, db: Session = Depends(get_db)):
    return delete_debt(db, debt_id)
