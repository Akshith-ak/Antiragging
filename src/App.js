// frontend/src/App.js

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // <-- 1. IMPORT THE TOASTER
import HomePage from './components/HomePage';
import ReportIncidentPage from './components/ReportIncidentPage';
import AdminLoginPage from './components/AdminLoginPage';
import AdminDashboard from './components/AdminDashboard';
import ReportDetailPage from './components/ReportDetailPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="App">
        {/* 2. ADD THE TOASTER COMPONENT HERE. IT WILL HANDLE ALL NOTIFICATIONS. */}
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          {/* ...your routes remain the same... */}
          <Route path="/" element={<HomePage />} />
          <Route path="/report" element={<ReportIncidentPage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={ <PrivateRoute><AdminDashboard /></PrivateRoute> } />
          <Route path="/admin/report/:reportId" element={ <PrivateRoute><ReportDetailPage /></PrivateRoute> } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;