import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DebtRegistration from './pages/DebtRegistration';
import DebtList from './pages/DebtList';
import Home from './components/Home';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/home" element={<Home />} />
                <Route path="/debt-registration" element={<DebtRegistration />} />
                <Route path="/debt-registration/:id" element={<DebtRegistration />} />
                <Route path="/debt-list" element={<DebtList />} />
            </Routes>
        </Router>
    );
};

export default App;
