export interface Debt {
    id?: string; // Opcional porque será gerado no backend
    title: string; 
    amount: number;
    due_date: string; // Formato ISO (YYYY-MM-DD)
    status: string; 
    notes?: string; 
}
