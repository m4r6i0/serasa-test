import React, { useEffect, useState } from "react";
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Button,
    IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MessageModal from "../components/MessageModal";
import api from "../services/api";

interface Debt {
    id: number;
    title: string;
    amount: number;
    due_date: string;
    status: string;
    notes?: string;
}

const DebtList: React.FC = () => {
    const [debts, setDebts] = useState<Debt[]>([]);
    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {
        const fetchDebts = async () => {
            try {
                const response = await api.get<Debt[]>("/debts/list");
                setDebts(response.data);
            } catch (err: any) {
                console.error("Erro ao buscar dívidas:", err);
                setError("Não foi possível carregar a lista de dívidas.");
            }
        };

        fetchDebts();
    }, []);

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleEdit = (debt: Debt) => {
        // Redirecionar para a página de edição com os dados da dívida
        window.location.replace(`/debt-registration/${debt.id}`);
    };

    const handleDelete = async (id: number) => {
        setModalTitle("Confirmação");
        setModalMessage("Tem certeza que deseja excluir esta dívida?");
        setModalOpen(true);

        // Após confirmação
        const confirmDelete = async () => {
            try {
                await api.delete(`/debts/delete/${id}`);
                setDebts((prevDebts) => prevDebts.filter((debt) => debt.id !== id));
                setModalTitle("Sucesso");
                setModalMessage("Dívida excluída com sucesso!");
            } catch (err) {
                console.error("Erro ao excluir dívida:", err);
                setModalTitle("Erro");
                setModalMessage("Não foi possível excluir a dívida.");
            } finally {
                setModalOpen(true);
            }
        };

        confirmDelete();
    };

    return (
        <Container>
            <Box sx={{ marginTop: 4, textAlign: "center" }}>
                <Typography variant="h4" gutterBottom>
                    Listagem de Dívidas
                </Typography>
                {error && (
                    <Typography color="error" sx={{ marginBottom: 2 }}>
                        {error}
                    </Typography>
                )}
                {debts.length === 0 && !error ? (
                    <Typography variant="h6" color="textSecondary">
                        Nenhuma dívida cadastrada.
                    </Typography>
                ) : (
                    <TableContainer component={Paper} sx={{ marginTop: 3 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Título</b></TableCell>
                                    <TableCell><b>Valor</b></TableCell>
                                    <TableCell><b>Data de Vencimento</b></TableCell>
                                    <TableCell><b>Status</b></TableCell>
                                    <TableCell><b>Notas</b></TableCell>
                                    <TableCell><b>Ações</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {debts.map((debt) => (
                                    <TableRow key={debt.id}>
                                        <TableCell>{debt.title}</TableCell>
                                        <TableCell>R$ {debt.amount.toFixed(2)}</TableCell>
                                        <TableCell>{new Date(debt.due_date).toLocaleDateString()}</TableCell>
                                        <TableCell
                                            sx={{
                                                color: debt.status === "Pago" ? "green" : "red",
                                            }}
                                        >
                                            {debt.status}
                                        </TableCell>
                                        <TableCell>{debt.notes || "Sem notas"}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                aria-label="editar"
                                                color="primary"
                                                onClick={() => handleEdit(debt)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                aria-label="excluir"
                                                color="secondary"
                                                onClick={() => handleDelete(debt.id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 3 }}
                    onClick={() => window.location.replace("/home")}
                >
                    Voltar
                </Button>
            </Box>
            <MessageModal
                open={modalOpen}
                onClose={handleCloseModal}
                title={modalTitle}
                message={modalMessage}
                buttonName="Fechar"
            />
        </Container>
    );
};

export default DebtList;
