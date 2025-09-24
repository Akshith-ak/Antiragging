import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // 1. Import the decoder
import {
  FaFileAlt, FaClock, FaCheckCircle, FaExclamationCircle, FaSignOutAlt, FaDownload, FaEye,
  FaShieldAlt, FaHome, FaUserCog, FaPaperclip
} from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(''); // 2. New state for the email
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // 3. Decode the token to get the user's details
        const decodedToken = jwtDecode(token);
        setUserEmail(decodedToken.admin.email); // Set the email from the token's payload
      } catch (error) {
        console.error("Invalid token:", error);
        handleLogout(); // Log out if the token is bad
      }
    } else {
      handleLogout();
    }

    const fetchReports = async () => {
      if (!token) return;
      const config = { headers: { 'x-auth-token': token } };
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/reports`, config);
        setReports(response.data);
      } catch (err) {
        if (err.response && err.response.status === 401) handleLogout();
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [navigate]);

  const totalReports = reports.length;
  const pendingReports = reports.filter(r => r.status === 'Pending').length;
  const resolvedReports = reports.filter(r => r.status === 'Resolved').length;
  const highPriorityReports = reports.filter(r => r.severity === 'High').length;

  const summaryCards = [
      { title: 'Total Reports', value: totalReports, icon: <FaFileAlt />, color: 'blue' },
      { title: 'Pending', value: pendingReports, icon: <FaClock />, color: 'orange' },
      { title: 'Resolved', value: resolvedReports, icon: <FaCheckCircle />, color: 'green' },
      { title: 'High Priority', value: highPriorityReports, icon: <FaExclamationCircle />, color: 'red' },
  ];

  return (
    <div className="admin-dashboard-container">
      <header className="header">
        <Link to="/" className="header-logo"><FaShieldAlt className="logo-icon" /><h1>Anti-Ragging Portal</h1></Link>
        <nav className="header-nav">
          <NavLink to="/" className="nav-link"><FaHome /> Home</NavLink>
          <NavLink to="/report" className="nav-link"><FaFileAlt /> Report Incident</NavLink>
          <NavLink to="/admin/dashboard" className="nav-link active"><FaUserCog /> Admin</NavLink>
        </nav>
      </header>
      <div className="dashboard-page">
        <div className="dashboard-header">
            <div>
                <h2>Admin Dashboard</h2>
                <p>Manage and review incident reports</p>
            </div>
            {/* --- 4. DISPLAY THE EMAIL AND AVATAR DYNAMICALLY --- */}
            <div className="user-info">
                {userEmail && <div className="user-avatar">{userEmail[0].toUpperCase()}</div>}
                <span>{userEmail}</span>
                <button onClick={handleLogout} className="logout-btn"><FaSignOutAlt /> Logout</button>
            </div>
        </div>
        {loading ? (<h2>Loading reports...</h2>) : (
            <>
                <div className="summary-cards">
                    {summaryCards.map((card, index) => (
                        <div key={index} className="card">
                            <div className={`card-icon ${card.color}`}>{card.icon}</div>
                            <div className="card-content"><h3>{card.title}</h3><p>{card.value}</p></div>
                        </div>
                    ))}
                </div>
                <div className="reports-table-container">
                    <h3>Recent Reports</h3>
                    <table className="reports-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Severity</th>
                                <th>Location</th>
                                <th>Status</th>
                                <th>Evidence</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report) => (
                                <tr key={report._id}>
                                    <td>{report._id.slice(-8).toUpperCase()}</td>
                                    <td>{new Date(report.createdAt).toLocaleDateString()}</td>
                                    <td><span className={`severity-pill ${report.severity.toLowerCase()}`}>{report.severity}</span></td>
                                    <td>{report.location || 'Not specified'}</td>
                                    <td><span className={`status-pill ${report.status.toLowerCase()}`}>{report.status}</span></td>
                                    <td>
                                      {report.evidenceUrl ? (
                                        <a href={report.evidenceUrl} target="_blank" rel="noopener noreferrer" className="evidence-link">
                                          <FaPaperclip /> View
                                        </a>
                                      ) : ( 'N/A' )}
                                    </td>
                                    <td><Link to={`/admin/report/${report._id}`} className="action-btn"><FaEye /></Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

