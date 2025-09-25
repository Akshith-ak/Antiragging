// frontend/src/components/ReportDetailPage.js

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import API_URL from './apiConfig';
import { FaArrowLeft, FaExclamationTriangle, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaCheckCircle, FaHourglassHalf, FaSave } from 'react-icons/fa';
import './ReportDetailPage.css';

const ReportDetailPage = () => {
    const { reportId } = useParams();
    const navigate = useNavigate();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionText, setActionText] = useState('');

    // Using useCallback prevents this function from being recreated on every render,
    // which is good practice for functions used in useEffect.
    const handleLogout = useCallback(() => {
        localStorage.removeItem('token');
        navigate('/admin');
    }, [navigate]);

    useEffect(() => {
        const fetchReport = async () => {
            const token = localStorage.getItem('token');
            if (!token) { handleLogout(); return; }
            const config = { headers: { 'x-auth-token': token } };
            try {
                const response = await axios.get(`${API_URL}/api/reports/${reportId}`, config);
                setReport(response.data);
                setActionText(response.data.actionTaken || '');
            } catch (err) {
                if (err.response && err.response.status === 401) handleLogout();
            } finally {
                setLoading(false);
            }
        };
        fetchReport();
    }, [reportId, handleLogout]);

    const handleStatusChange = async (newStatus) => {
        const token = localStorage.getItem('token');
        if (!token) { handleLogout(); return; }
        const config = { headers: { 'x-auth-token': token } };
        try {
            await axios.put(`${API_URL}/api/reports/${reportId}`, { status: newStatus }, config);
            toast.success(`Status updated to ${newStatus}`);
            navigate('/dashboard');
        } catch (err) { toast.error('Failed to update status.'); }
    };

    const handleSaveAction = async () => {
        const token = localStorage.getItem('token');
        if (!token) { handleLogout(); return; }
        const config = { headers: { 'x-auth-token': token } };
        try {
            await axios.put(`${API_URL}/api/reports/${reportId}/action`, { actionTaken: actionText }, config);
            toast.success('Action notes saved!');
        } catch (err) { toast.error('Failed to save notes.'); }
    };

    // --- THIS IS THE MISSING renderEvidence FUNCTION ---
    const renderEvidence = () => {
        if (!report || !report.evidenceUrl) return null;
        const isVideo = report.evidenceUrl.match(/\.(mp4|mov|avi)$/) != null;
        if (isVideo) {
            return (<video controls className="evidence-video"><source src={report.evidenceUrl} type="video/mp4" />Your browser does not support video.</video>);
        } else {
            return (<a href={report.evidenceUrl} target="_blank" rel="noopener noreferrer"><img src={report.evidenceUrl} alt="Evidence" className="evidence-image" /></a>);
        }
    };

    // --- THESE CHECKS PREVENT THE APP FROM CRASHING ---
    // If the data is still loading, show a loading message.
    if (loading) {
        return <div className="report-detail-page"><h2>Loading Report...</h2></div>;
    }
    // If loading is finished but the report is still null (e.g., not found), show an error.
    if (!report) {
        return <div className="report-detail-page not-found"><h2>Report Not Found</h2></div>;
    }

    // --- The complete JSX for your page ---
    return (
        <div className="report-detail-page">
            <div className="detail-header">
                <button onClick={() => navigate('/dashboard')} className="back-btn"><FaArrowLeft /> Back to Dashboard</button>
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
                
                <div className="action-section">
                    <h4>Action Taken</h4>
                    <p>Detail the actions taken to address this report.</p>
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