// frontend/src/components/AdminLoginPage.js

import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import API_URL from './apiConfig';
import { FaShieldAlt, FaHome, FaFileAlt, FaUserCog } from 'react-icons/fa';

const AdminLoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard'); // If already logged in, go to dashboard
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                toast.success('Login Successful!');
                navigate('/dashboard'); // Navigate to the correct, simple path
            }
        } catch (err) {
            toast.error('Invalid credentials. Please try again.');
        }
    };
    
    return (
        <div className="admin-login-page">
            <header className="header">
                <Link to="/" className="header-logo"><FaShieldAlt /><h1>Anti-Ragging Portal</h1></Link>
                <nav className="header-nav">
                    <NavLink to="/" className="nav-link"><FaHome /> Home</NavLink>
                    <NavLink to="/report" className="nav-link"><FaFileAlt /> Report Incident</NavLink>
                    <NavLink to="/admin" className="nav-link active"><FaUserCog /> Admin</NavLink>
                </nav>
            </header>
            <div className="login-container">
                <div className="login-box">
                    <h2>Admin Login</h2>
                    <p>Access the complaint management dashboard</p>
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group"><label>Email Address</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
                        <div className="form-group"><label>Password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
                        <button type="submit" className="login-btn">Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default AdminLoginPage;