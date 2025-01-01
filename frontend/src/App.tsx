import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DebtRegistration from './pages/DebtRegistration';
import Home from './components/Home';
// Importe outras páginas se necessário

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/home" element={<Home />} />
                <Route path="/debt-registration" element={<DebtRegistration />} />

                {/* Outras rotas */}
            </Routes>
        </Router>
    );
};

export default App;
