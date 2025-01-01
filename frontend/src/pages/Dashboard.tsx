import React from "react";
import { Container, Typography, Box, Grid, Paper } from "@mui/material";

const Dashboard: React.FC = () => {
    return (
        <Container>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Resumo Financeiro
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6">Total de Dívidas</Typography>
                            <Typography variant="body1">R$ 10.000,00</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6">Dívidas Pendentes</Typography>
                            <Typography variant="body1">R$ 7.000,00</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6">Dívidas Pagas</Typography>
                            <Typography variant="body1">3</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Dashboard;
