// src/components/Header.js

import React from 'react';
import { FaShieldAlt, FaHome, FaFileAlt, FaUserCog } from 'react-icons/fa';
import { NavLink, Link } from 'react-router-dom'; // <-- Use NavLink for navigation

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="header-logo">
        <FaShieldAlt className="logo-icon" />
        <h1>Anti-Ragging Portal</h1>
      </Link>
      <nav className="header-nav">
        {/* NavLink will automatically add the 'active' class when the URL matches */}
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <FaHome /> Home
        </NavLink>
        <NavLink to="/report" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <FaFileAlt /> Report Incident
        </NavLink>
        <NavLink to="/admin" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <FaUserCog /> Admin
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;