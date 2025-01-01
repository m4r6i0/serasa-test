import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    CardActions,
    Box,
    Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigation = (route: string) => {
        navigate(route);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ background: "linear-gradient(to right, #0063b1, #00a4e4)" }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
                        Gestão de Dívidas Pessoais
                    </Typography>
                    <Button color="inherit" onClick={() => handleNavigation("/login")}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Box sx={{ textAlign: "center", mt: 5, mb: 5 }}>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#0063b1" }}>
                        Bem-vindo à Gestão de Dívidas Pessoais
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#555" }}>
                        Escolha uma das opções abaixo para gerenciar suas dívidas de forma eficiente.
                    </Typography>
                </Box>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ boxShadow: 3 }}>
                            <CardContent>
                                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#0063b1" }}>
                                    Cadastro de Dívidas
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 1, color: "#666" }}>
                                    Permita que o usuário registre novas dívidas facilmente.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleNavigation("/debt-registration")}
                                >
                                    Acessar
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ boxShadow: 3 }}>
                            <CardContent>
                                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#0063b1" }}>
                                    Listagem de Dívidas
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 1, color: "#666" }}>
                                    Visualize todas as dívidas registradas, com destaques para as vencidas.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleNavigation("/listagem-dividas")}
                                >
                                    Acessar
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ boxShadow: 3 }}>
                            <CardContent>
                                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#0063b1" }}>
                                    Resumo Financeiro
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 1, color: "#666" }}>
                                    Exiba totais, valores pendentes e quantidade de dívidas pagas.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleNavigation("/resumo-financeiro")}
                                >
                                    Acessar
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Home;
