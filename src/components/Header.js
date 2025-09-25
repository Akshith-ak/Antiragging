// frontend/src/components/Header.js

import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaShieldAlt, FaHome, FaFileAlt, FaUserCog } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="header-logo"><FaShieldAlt /><h1>Anti-Ragging Portal</h1></Link>
      <nav className="header-nav">
        <NavLink to="/" className="nav-link" end><FaHome /> Home</NavLink>
        <NavLink to="/report" className="nav-link"><FaFileAlt /> Report Incident</NavLink>
        <NavLink to="/admin" className="nav-link"><FaUserCog /> Admin</NavLink>
      </nav>
    </header>
  );
};
export default Header;