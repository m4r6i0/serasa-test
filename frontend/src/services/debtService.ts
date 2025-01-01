import api from "./api";
import { Debt } from "../types/Debt";

// Criar uma nova dívida
export const createDebt = async (debt: Debt): Promise<Debt> => {
    const response = await api.post<Debt>("/debts/create", debt);
    return response.data;
};

// Listar todas as dívidas
export const listDebts = async (): Promise<Debt[]> => {
    const response = await api.get<Debt[]>("/debts/list");
    return response.data;
};

// Atualizar uma dívida existente
export const updateDebt = async (debtId: string, updatedDebt: Debt): Promise<Debt> => {
    const response = await api.put<Debt>(`/debts/update/${debtId}`, updatedDebt);
    return response.data;
};

// Deletar uma dívida
export const deleteDebt = async (debtId: string): Promise<void> => {
    await api.delete(`/debts/delete/${debtId}`);
};
