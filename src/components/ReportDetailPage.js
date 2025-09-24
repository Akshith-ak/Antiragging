import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaArrowLeft, FaExclamationTriangle, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaCheckCircle, FaHourglassHalf, FaSave } from 'react-icons/fa';
import './ReportDetailPage.css';

const ReportDetailPage = () => {
    const { reportId } = useParams();
    const navigate = useNavigate();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    // 1. New state to manage the text in the "Action Taken" input box
    const [actionText, setActionText] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin');
    };

    useEffect(() => {
        const fetchReport = async () => {
            const token = localStorage.getItem('token');
            if (!token) { handleLogout(); return; }
            const config = { headers: { 'x-auth-token': token } };
            try {
                const response = await axios.get(`http://localhost:5000/api/reports/${reportId}`, config);
                setReport(response.data);
                // 2. When data is loaded, fill the text box with any previously saved notes
                setActionText(response.data.actionTaken || '');
            } catch (err) {
                if (err.response && err.response.status === 401) handleLogout();
            } finally {
                setLoading(false);
            }
        };
        fetchReport();
    }, [reportId, navigate]);

    // This function for changing status remains the same
    const handleStatusChange = async (newStatus) => {
        const token = localStorage.getItem('token');
        if (!token) { handleLogout(); return; }
        const config = { headers: { 'x-auth-token': token } };
        try {
            await axios.put(`http://localhost:5000/api/reports/${reportId}`, { status: newStatus }, config);
            toast.success(`Report status updated to ${newStatus}`);
            navigate('/admin/dashboard');
        } catch (err) {
            toast.error('Failed to update status.');
        }
    };

    // 3. New function to handle saving the action notes
    const handleSaveAction = async () => {
        const token = localStorage.getItem('token');
        if (!token) { handleLogout(); return; }
        const config = { headers: { 'x-auth-token': token } };
        try {
            await axios.put(`http://localhost:5000/api/reports/${reportId}/action`, { actionTaken: actionText }, config);
            toast.success('Action notes saved successfully!');
        } catch (err) {
            console.error('Error saving action:', err);
            toast.error('Failed to save action notes.');
        }
    };
    
    if (loading) return <div className="report-detail-page"><h2>Loading...</h2></div>;
    if (!report) return <div className="report-detail-page"><h2>Report Not Found</h2></div>;

    const renderEvidence = () => {
        if (!report.evidenceUrl) return null;
        const isVideo = report.evidenceUrl.match(/\.(mp4|mov|avi)$/) != null;
        if (isVideo) {
            return <video controls className="evidence-video"><source src={report.evidenceUrl} /></video>;
        } else {
            return <a href={report.evidenceUrl} target="_blank" rel="noopener noreferrer"><img src={report.evidenceUrl} alt="Evidence" className="evidence-image" /></a>;
        }
    };

    return (
        <div className="report-detail-page">
            <div className="detail-header">
                <button onClick={() => navigate('/admin/dashboard')} className="back-btn"><FaArrowLeft /> Back to Dashboard</button>
            </div>
            <div className="detail-card">
                <div className="detail-card-header">
                    <h2>Incident Details</h2>
                    <span className={`status-pill ${report.status.toLowerCase()}`}>{report.status}</span>
                </div>
                <div className="detail-item"><h4><FaExclamationTriangle /> Severity</h4><p className={`severity-pill ${report.severity.toLowerCase()}`}>{report.severity}</p></div>
                <div className="detail-grid">
                    <div className="detail-item"><h4><FaCalendarAlt /> Date</h4><p>{new Date(report.createdAt).toLocaleDateString()}</p></div>
                    <div className="detail-item"><h4><FaClock /> Time</h4><p>{report.time || 'Not specified'}</p></div>
                </div>
                <div className="detail-item"><h4><FaMapMarkerAlt /> Location</h4><p>{report.location || 'Not specified'}</p></div>
                <div className="detail-item"><h4>Description</h4><p className="description-text">{report.description}</p></div>
                
                {report.evidenceUrl && (<div className="detail-item"><h4>Evidence</h4>{renderEvidence()}</div>)}
                
                {/* --- 4. THIS IS THE NEW VISIBLE SECTION FOR THE ADMIN --- */}
                <div className="action-section">
                    <h4>Action Taken</h4>
                    <p>Detail the actions taken to address this report (e.g., meeting with students, disciplinary action, etc.).</p>
                    <textarea
                        className="action-textarea"
                        placeholder="Type your notes here..."
                        value={actionText}
                        onChange={(e) => setActionText(e.target.value)}
                    ></textarea>
                    <button onClick={handleSaveAction} className="save-action-btn">
                        <FaSave /> Save Action
                    </button>
                </div>

                <div className="action-buttons">
                    <button onClick={() => handleStatusChange('Pending')} className="action-btn pending"><FaHourglassHalf /> Mark as Pending</button>
                    <button onClick={() => handleStatusChange('Resolved')} className="action-btn resolved"><FaCheckCircle /> Mark as Resolved</button>
                </div>
            </div>
        </div>
    );
};

export default ReportDetailPage;
