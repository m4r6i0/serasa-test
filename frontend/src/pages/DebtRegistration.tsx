import React, { useState } from "react";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    CssBaseline,
    MenuItem,
    ThemeProvider,
} from "@mui/material";
import CurrencyInput from "react-currency-input-field";
import { useNavigate } from "react-router-dom";
import MessageModal from "../components/MessageModal";
import theme from "../styles/theme";
import api from "../services/api";

const DebtRegistration: React.FC = () => {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState<string | undefined>("");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState("Pendente");
    const [notes, setNotes] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const navigate = useNavigate();

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const cleanFields = () => {
        // Limpa os campos após sucesso
        setTitle("");
        setAmount(undefined);
        setDueDate("");
        setStatus("Pendente");
        setNotes("");
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!amount || parseFloat(amount.replace(",", ".")) <= 0) {
            setModalTitle("Erro");
            setModalMessage("O campo 'Valor' é obrigatório e deve ser maior que zero.");
            setModalOpen(true);
            return;
        }

        if (!dueDate || new Date(dueDate) < new Date()) {
            setModalTitle("Erro");
            setModalMessage("A data de vencimento não pode ser anterior à data atual.");
            setModalOpen(true);
            return;
        }

        try {
            const payload = {
                title,
                amount: parseFloat(amount.replace(",", ".")),
                due_date: dueDate,
                status,
                notes,
            };

            await api.post("/debts/create", payload);
            setModalTitle("Sucesso");
            setModalMessage("Dívida cadastrada com sucesso!");
            setModalOpen(true);
            cleanFields();
            
        } catch (error: any) {
            console.error("Erro ao cadastrar dívida:", error);
            const errorMessage = error.response?.data?.detail || "Erro ao cadastrar dívida. Tente novamente.";
            setModalTitle("Erro");
            setModalMessage(errorMessage);
            setModalOpen(true);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="sm">
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: 3,
                        backgroundColor: "#fff",
                        borderRadius: 2,
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    }}
                >
                    <Typography component="h1" variant="h5" gutterBottom>
                        Cadastro de Dívidas
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <TextField
                            fullWidth
                            required
                            label="Nome da Dívida"
                            margin="normal"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <CurrencyInput
                            id="amount"
                            name="amount"
                            placeholder="R$ 0,00"
                            value={amount || ""}
                            decimalsLimit={2}
                            onValueChange={(value) => setAmount(value || undefined)}
                            prefix="R$ "
                            style={{
                                width: "100%",
                                height: "56px",
                                border: "1px solid #c4c4c4",
                                borderRadius: "4px",
                                fontSize: "16px",
                                padding: "0 16px",
                                boxSizing: "border-box",
                                marginTop: "16px",
                                marginBottom: "16px",
                            }}
                        />
                        <TextField
                            fullWidth
                            required
                            label="Data de Vencimento"
                            type="date"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            select
                            label="Status"
                            margin="normal"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <MenuItem value="Pendente">Pendente</MenuItem>
                            <MenuItem value="Pago">Pago</MenuItem>
                        </TextField>
                        <TextField
                            fullWidth
                            label="Notas"
                            margin="normal"
                            multiline
                            rows={3}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3 }}
                        >
                            Cadastrar
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="secondary"
                            sx={{ mt: 2 }}
                            onClick={() => navigate("/home")}
                        >
                            Voltar
                        </Button>
                    </Box>
                </Box>
                <MessageModal
                    open={modalOpen}
                    onClose={handleCloseModal}
                    title={modalTitle}
                    message={modalMessage}
                    buttonName="Fechar"
                />
            </Container>
        </ThemeProvider>
    );
};

export default DebtRegistration;