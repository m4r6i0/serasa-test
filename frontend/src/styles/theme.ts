import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Azul
    },
    secondary: {
      main: "#dc004e", // Vermelho
    },
    background: {
      default: "#f5f5f5", // Cinza claro para o fundo
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

export default theme;
