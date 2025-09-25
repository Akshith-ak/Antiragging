// frontend/src/App.js

import React from 'react';
import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
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
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/report" element={<ReportIncidentPage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          {/* Use simple, direct paths for protected routes */}
          <Route path="/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
          <Route path="/report/:reportId" element={<PrivateRoute><ReportDetailPage /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;