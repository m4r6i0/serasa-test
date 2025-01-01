import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
// Importe outras páginas se necessário

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                {/* Outras rotas */}
            </Routes>
        </Router>
    );
};

export default App;
