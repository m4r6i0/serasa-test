# services/__init__.py
from .user_service import register_user, authenticate_user
from .debt_service import create_debt, list_debts, update_debt, delete_debt
