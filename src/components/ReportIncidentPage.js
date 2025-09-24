// frontend/src/components/ReportIncidentPage.js

import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  FaShieldAlt, FaHome, FaFileAlt, FaUserCog, FaPencilAlt,
  FaCalendarAlt, FaClock, FaMapMarkerAlt, FaExclamationTriangle,
  FaUpload, FaLock, FaCheckCircle
} from 'react-icons/fa';

const ReportIncidentPage = () => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [severity, setSeverity] = useState(null);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!severity) return toast.error('Please select a severity level.');
        if (description.length < 50) return toast.error('Description must be at least 50 characters long.');

        let evidenceUrl = '';

        // --- UPLOAD FILE IF EXISTS ---
        if (file) {
            setUploading(true);
            const formData = new FormData();
            formData.append('evidence', file);

            try {
                const uploadRes = await axios.post(
                  `${process.env.REACT_APP_BACKEND_URL}/api/upload`,
                  formData,
                  { headers: { 'Content-Type': 'multipart/form-data' } }
                );
                evidenceUrl = uploadRes.data.filePath;
            } catch (err) {
                console.error('File upload error:', err);
                toast.error('File upload failed. Please try again.');
                setUploading(false);
                return;
            }
            setUploading(false);
        }

        // --- SUBMIT REPORT ---
        try {
            const reportData = { description, date, time, location, severity, evidenceUrl };
            await axios.post(
              `${process.env.REACT_APP_BACKEND_URL}/api/reports`,
              reportData
            );

            toast.success('Report submitted successfully!');
            navigate('/');
        } catch (err) {
            console.error('Submission error:', err);
            toast.error('Failed to submit report. Please try again.');
        }
    };

    return (
        <div className="report-incident-page">
            <header className="header">
                <Link to="/" className="header-logo">
                    <FaShieldAlt className="logo-icon" /><h1>Anti-Ragging Portal</h1>
                </Link>
                <nav className="header-nav">
                    <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}><FaHome /> Home</NavLink>
                    <NavLink to="/report" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}><FaFileAlt /> Report Incident</NavLink>
                    <NavLink to="/admin" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}><FaUserCog /> Admin</NavLink>
                </nav>
            </header>

            <div className="report-container">
                <h2 className="report-title">Submit Anonymous Report</h2>
                <p className="report-subtitle">Your report is completely anonymous. Please provide as much detail as possible to help us investigate.</p>
                <div className="anonymous-tag"><FaCheckCircle className="anonymous-icon" />100% Anonymous & Confidential</div>

                <form className="report-form" onSubmit={handleSubmit}>
                    {/* DESCRIPTION */}
                    <div className="form-section">
                        <label className="form-label"><FaPencilAlt /> Incident Description *</label>
                        <textarea
                          className="form-textarea"
                          placeholder="Please describe the incident in detail..."
                          rows="6"
                          minLength="50"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        ></textarea>
                        <p className="form-help-text">Minimum 50 characters required. Be as detailed as possible.</p>
                    </div>

                    {/* DATE & TIME */}
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label"><FaCalendarAlt /> Incident Date</label>
                            <input type="date" className="form-input" value={date} onChange={(e) => setDate(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-label"><FaClock /> Approximate Time</label>
                            <input type="time" className="form-input" value={time} onChange={(e) => setTime(e.target.value)} />
                        </div>
                    </div>

                    {/* LOCATION */}
                    <div className="form-section">
                        <label className="form-label"><FaMapMarkerAlt /> Location of Incident</label>
                        <input type="text" className="form-input" placeholder="e.g., Library 3rd Floor, Dormitory Block A..." value={location} onChange={(e) => setLocation(e.target.value)} />
                    </div>

                    {/* SEVERITY */}
                    <div className="form-section">
                        <label className="form-label"><FaExclamationTriangle /> Severity Level *</label>
                        <div className="severity-options">
                            {['Low','Medium','High'].map((level) => (
                                <div
                                  key={level}
                                  className={`severity-card ${severity === level ? 'selected' : ''}`}
                                  onClick={() => setSeverity(level)}
                                >
                                    <div className={`severity-indicator ${level.toLowerCase()}`}></div>
                                    <h4>{level}</h4>
                                    <p>{level === 'Low' ? 'Minor incident' : level === 'Medium' ? 'Concerning behavior' : 'Serious incident'}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* EVIDENCE */}
                    <div className="form-section">
                        <label className="form-label"><FaUpload /> Evidence (Optional)</label>
                        <div className="file-upload-box">
                            <FaUpload className="upload-icon-lg" />
                            <p>{file ? file.name : 'Click to upload files'}</p>
                            <p className="upload-info">Images, PDFs, or documents (Max 10MB)</p>
                            <input type="file" className="file-input" onChange={handleFileChange} />
                        </div>
                    </div>

                    {/* PRIVACY */}
                    <div className="privacy-notice">
                        <FaLock className="privacy-icon" />
                        <div>
                            <h4>Your Privacy is Protected</h4>
                            <p>This form does not collect any identifying information. Your IP address is not logged.</p>
                        </div>
                    </div>

                    {/* SUBMIT BUTTON */}
                    <button type="submit" className="submit-report-btn" disabled={uploading}>
                        {uploading ? 'Uploading Evidence...' : <><FaShieldAlt /> Submit Anonymous Report</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReportIncidentPage;
