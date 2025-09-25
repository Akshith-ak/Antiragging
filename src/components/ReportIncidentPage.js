// frontend/src/components/ReportIncidentPage.js

import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import API_URL from './apiConfig';
import { FaShieldAlt, FaHome, FaFileAlt, FaUserCog, FaPencilAlt, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaExclamationTriangle, FaUpload, FaLock, FaCheckCircle } from 'react-icons/fa';

const ReportIncidentPage = () => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [severity, setSeverity] = useState(null);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => { setFile(e.target.files[0]); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!severity) return toast.error('Please select a severity level.');
        if (description.length < 50) return toast.error('Description must be at least 50 characters long.');
        let evidenceUrl = '';
        if (file) {
            setUploading(true);
            const formData = new FormData();
            formData.append('evidence', file);
            try {
                const uploadRes = await axios.post(`${API_URL}/api/upload`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                evidenceUrl = uploadRes.data.filePath;
            } catch (err) {
                toast.error('File upload failed.'); setUploading(false); return;
            }
            setUploading(false);
        }
        try {
            const reportData = { description, date, time, location, severity, evidenceUrl };
            await axios.post(`${API_URL}/api/reports`, reportData);
            toast.success('Report submitted successfully!');
            navigate('/');
        } catch (err) {
            toast.error('Failed to submit report.');
        }
    };

    return (
        <div className="report-incident-page">
            <header className="header"><Link to="/" className="header-logo"><FaShieldAlt /><h1>Anti-Ragging Portal</h1></Link><nav className="header-nav"><NavLink to="/" className="nav-link"><FaHome /> Home</NavLink><NavLink to="/report" className="nav-link active"><FaFileAlt /> Report Incident</NavLink><NavLink to="/admin" className="nav-link"><FaUserCog /> Admin</NavLink></nav></header>
            <div className="report-container">
                <h2 className="report-title">Submit Anonymous Report</h2>
                <p className="report-subtitle">Your report is completely anonymous. Please provide as much detail as possible.</p>
                <div className="anonymous-tag"><FaCheckCircle />100% Anonymous & Confidential</div>
                <form className="report-form" onSubmit={handleSubmit}>
                    <div className="form-section"><label className="form-label"><FaPencilAlt /> Incident Description *</label><textarea className="form-textarea" placeholder="Describe the incident..." value={description} onChange={(e) => setDescription(e.target.value)} required /><p className="form-help-text">Minimum 50 characters required.</p></div>
                    <div className="form-row"><div className="form-group"><label className="form-label"><FaCalendarAlt /> Incident Date</label><input type="date" className="form-input" value={date} onChange={(e) => setDate(e.target.value)} /></div><div className="form-group"><label className="form-label"><FaClock /> Approximate Time</label><input type="time" className="form-input" value={time} onChange={(e) => setTime(e.target.value)} /></div></div>
                    <div className="form-section"><label className="form-label"><FaMapMarkerAlt /> Location of Incident</label><input type="text" className="form-input" placeholder="e.g., Library 3rd Floor..." value={location} onChange={(e) => setLocation(e.target.value)} /></div>
                    <div className="form-section">
                        <label className="form-label"><FaExclamationTriangle /> Severity Level *</label>
                        <div className="severity-options">
                            <div className={`severity-card ${severity === 'Low' ? 'selected' : ''}`} onClick={() => setSeverity('Low')}><div className="severity-indicator low"></div><h4>Low</h4><p>Minor incident</p></div>
                            <div className={`severity-card ${severity === 'Medium' ? 'selected' : ''}`} onClick={() => setSeverity('Medium')}><div className="severity-indicator medium"></div><h4>Medium</h4><p>Concerning</p></div>
                            <div className={`severity-card ${severity === 'High' ? 'selected' : ''}`} onClick={() => setSeverity('High')}><div className="severity-indicator high"></div><h4>High</h4><p>Serious incident</p></div>
                        </div>
                    </div>
                    <div className="form-section"><label className="form-label"><FaUpload /> Evidence (Optional)</label><div className="file-upload-box"><FaUpload className="upload-icon-lg" /><p>{file ? file.name : 'Click to upload files'}</p><input type="file" className="file-input" onChange={handleFileChange} /></div></div>
                    <div className="privacy-notice"><FaLock className="privacy-icon" /><div><h4>Your Privacy is Protected</h4><p>This form does not collect any identifying information.</p></div></div>
                    <button type="submit" className="submit-report-btn" disabled={uploading}>{uploading ? 'Uploading Evidence...' : <><FaShieldAlt /> Submit Anonymous Report</>}</button>
                </form>
            </div>
        </div>
    );
};
export default ReportIncidentPage;