// frontend/src/components/AdminLoginPage.js

import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast'; // Import toast
import { FaShieldAlt, FaHome, FaFileAlt, FaUserCog } from 'react-icons/fa';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      if (token) {
        navigate('/admin/dashboard');
      }
    };
    checkAuthStatus();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        toast.success('Login Successful!'); // Optional success toast
        navigate('/admin/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err.response ? err.response.data.msg : err.message);
      toast.error('Invalid credentials. Please try again.'); // Replaced alert
    }
  };

  return (
    <div className="admin-login-page">
      <header className="header">
        <Link to="/" className="header-logo"><FaShieldAlt className="logo-icon" /><h1>Anti-Ragging Portal</h1></Link>
        <nav className="header-nav">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}><FaHome /> Home</NavLink>
          <NavLink to="/report" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}><FaFileAlt /> Report Incident</NavLink>
          <NavLink to="/admin" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}><FaUserCog /> Admin</NavLink>
        </nav>
      </header>
      <div className="login-container">
        <div className="login-box">
          <h2>Admin Login</h2>
          <p>Access the complaint management dashboard</p>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@college.edu" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>
            <button type="submit" className="login-btn">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;