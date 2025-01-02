import React, { useEffect, useState } from "react";
import {
    Container,
    Typography,
    Box,
    Grid,
    Paper,
    CircularProgress,
} from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import api from "../services/api";

interface Debt {
    id: number;
    amount: number;
    status: string;
}

const Dashboard: React.FC = () => {
    const [totalDebt, setTotalDebt] = useState(0);
    const [pendingDebt, setPendingDebt] = useState(0);
    const [paidDebtCount, setPaidDebtCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get<Debt[]>("/debts/list");
                const debts = response.data;

                const total = debts.reduce((acc, debt) => acc + debt.amount, 0);
                const pending = debts
                    .filter((debt) => debt.status === "Pendente")
                    .reduce((acc, debt) => acc + debt.amount, 0);
                const paidCount = debts.filter((debt) => debt.status === "Pago").length;

                setTotalDebt(total);
                setPendingDebt(pending);
                setPaidDebtCount(paidCount);
            } catch (error) {
                console.error("Erro ao buscar dados do resumo financeiro:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const data = [
        { name: "Pendentes", value: pendingDebt },
        { name: "Pagas", value: totalDebt - pendingDebt },
    ];

    const COLORS = ["#FF8042", "#00C49F"];

    return (
        <Container>
            <Box sx={{ mt: 4, textAlign: "center" }}>
                <Typography variant="h4" gutterBottom>
                    Resumo Financeiro
                </Typography>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper sx={{ p: 2 }}>
                                <Typography variant="h6">Total de Dívidas</Typography>
                                <Typography variant="h5">R$ {totalDebt.toFixed(2)}</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper sx={{ p: 2 }}>
                                <Typography variant="h6">Dívidas Pendentes</Typography>
                                <Typography variant="h5">R$ {pendingDebt.toFixed(2)}</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper sx={{ p: 2 }}>
                                <Typography variant="h6">Dívidas Pagas</Typography>
                                <Typography variant="h5">{paidDebtCount}</Typography>
                            </Paper>
                        </Grid>
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
                )}
            </Box>
        </Container>
    );
};

export default Dashboard;
