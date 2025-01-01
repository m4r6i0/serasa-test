import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    CssBaseline,
    ThemeProvider,
    Avatar,
    Link,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled } from '@mui/system';
import theme from '../styles/theme';
import { login } from '../services/authService';
import MessageModal from '../components/MessageModal';
import { useNavigate } from 'react-router-dom';

const StyledContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'linear-gradient(to right, #0063b1, #00a4e4)',
    color: '#fff',
    padding: '0 20px',
});

const StyledBox = styled(Box)({
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
});

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const [errorMessage, setErrorMessage] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const credentials = { username: email, password };
            const response = await login(credentials);
            localStorage.setItem('token', response.access_token);
            setIsAuthenticated(true);
            navigate("/home");
        } catch (error) {
            console.error('Erro ao realizar login', error);
            setErrorMessage('Erro ao realizar login. Verifique suas credenciais e tente novamente.');
            setModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleRegisterRedirect = () => {
        navigate('/register'); // Direciona para a página de registro
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <StyledContainer>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ color: '#fff', mb: 2 }}>
                    Login
                </Typography>
                <StyledBox>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Senha"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Entrar
                        </Button>
                        <Typography variant="body2" align="center" sx={{ mt: 2, color: '#000' }}>
                            Não possui uma conta?{' '}
                            <Link
                                component="button"
                                variant="body2"
                                onClick={handleRegisterRedirect}
                                sx={{ color: 'primary.main', fontWeight: 'bold' }}
                            >
                                Registre-se aqui
                            </Link>
                        </Typography>
                    </Box>
                </StyledBox>
                <MessageModal
                    open={modalOpen}
                    onClose={handleCloseModal}
                    title="Falha de Autenticação"
                    message={errorMessage}
                    buttonName="Log In"
                />
            </StyledContainer>
        </ThemeProvider>
    );
};

export default Login;
