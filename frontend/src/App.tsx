import React, { useState, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { login } from "./services/authService";

const Login: React.FC = () => {
  const authContext = useContext(AuthContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authContext) {
      try {
        const data = await login({ username, password });
        localStorage.setItem("token", data.access_token);
        authContext.setIsAuthenticated(true);
      } catch (error) {
        console.error("Erro no login", error);
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Usuário" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
