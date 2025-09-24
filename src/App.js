import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from './components/HomePage';
import ReportIncidentPage from './components/ReportIncidentPage';
import AdminLoginPage from './components/AdminLoginPage';
import AdminDashboard from './components/AdminDashboard';
import ReportDetailPage from './components/ReportDetailPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/report" element={<ReportIncidentPage />} />
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/report/:reportId" element={<PrivateRoute><ReportDetailPage /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;
