import React, { useEffect, useState } from "react";
import {
    Container,
    Typography,
    Box,
    Grid,
    Paper,
    Button,
    CircularProgress,
} from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

interface Debt {
    id: number;
    amount: number;
    status: string;
}

const Dashboard: React.FC = () => {
    const [totalDebtsCount, setTotalDebtsCount] = useState(0); // Total de dívidas cadastradas
    const [pendingDebtAmount, setPendingDebtAmount] = useState(0); // Valor total de dívidas pendentes
    const [paidDebtAmount, setPaidDebtAmount] = useState(0); // Valor total de dívidas pagas
    const [overdueDebtAmount, setOverdueDebtAmount] = useState(0); // Valor total de dívidas atrasadas
    const [overdueDebtCount, setOverdueDebtCount] = useState(0); // Quantidade de dívidas atrasadas
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get<Debt[]>("/debts/list");
                const debts = response.data;

                // Total de dívidas cadastradas
                setTotalDebtsCount(debts.length);

                // Valor total de dívidas pendentes
                const totalPending = debts
                    .filter((debt) => debt.status === "Pendente")
                    .reduce((acc, debt) => acc + debt.amount, 0);
                setPendingDebtAmount(totalPending);

                // Valor total de dívidas pagas
                const totalPaid = debts
                    .filter((debt) => debt.status === "Pago")
                    .reduce((acc, debt) => acc + debt.amount, 0);
                setPaidDebtAmount(totalPaid);

                // Valor total e quantidade de dívidas atrasadas
                const overdueDebts = debts.filter((debt) => debt.status === "Atrasado");
                const overdueAmount = overdueDebts.reduce(
                    (acc, debt) => acc + debt.amount,
                    0
                );
                setOverdueDebtAmount(overdueAmount);
                setOverdueDebtCount(overdueDebts.length);
            } catch (error) {
                console.error("Erro ao buscar dados do resumo financeiro:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Dados para o gráfico
    const data = [
        { name: "Pendentes", value: pendingDebtAmount },
        { name: "Pagas", value: paidDebtAmount },
        { name: "Atrasadas", value: overdueDebtAmount },
    ];

    const COLORS = ["#FF8042", "#00C49F", "#FF0000"]; // Cores para o gráfico

    return (
        <Container>
            <Box sx={{ mt: 4, textAlign: "center" }}>
                <Typography variant="h4" gutterBottom>
                    Resumo Financeiro
                </Typography>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} md={3}>
                                <Paper sx={{ p: 2 }}>
                                    <Typography variant="h6">Total de Dívidas</Typography>
                                    <Typography variant="h5">{totalDebtsCount}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Paper sx={{ p: 2 }}>
                                    <Typography variant="h6">Dívidas Pendentes</Typography>
                                    <Typography variant="h5">
                                        R$ {pendingDebtAmount.toFixed(2)}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Paper sx={{ p: 2 }}>
                                    <Typography variant="h6">Dívidas Pagas</Typography>
                                    <Typography variant="h5">R$ {paidDebtAmount.toFixed(2)}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Paper sx={{ p: 2 }}>
                                    <Typography variant="h6">Dívidas Atrasadas</Typography>
                                    <Typography variant="h5">
                                        R$ {overdueDebtAmount.toFixed(2)}
                                    </Typography>
                                    <Typography variant="body2">
                                        Quantidade: {overdueDebtCount}
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3} sx={{ mt: 4 }}>
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Distribuição de Dívidas
                                    </Typography>
                                    <PieChart width={400} height={300}>
                                        <Pie
                                            data={data}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={100}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {data.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={COLORS[index % COLORS.length]}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </Paper>
                            </Grid>
                        </Grid>
                    </>
                )}
                <Box sx={{ mt: 4 }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => navigate(-1)} // Navega para a página anterior
                    >
                        Voltar
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Dashboard;
