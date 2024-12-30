# dto/debt_dto.py
from pydantic import BaseModel
from datetime import date

class DebtCreate(BaseModel):
    title: str
    amount: float
    due_date: date
    status: str
    notes: str | None = None

class DebtResponse(BaseModel):
    id: int
    title: str
    amount: float
    due_date: date
    status: str
    notes: str | None

    class Config:
        orm_mode = True