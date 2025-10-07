/* Path: src/pages/DashboardPage.jsx */

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const paymentPlans = [
    { id: 1, name: '5 Marla', price: '225,000', brief: 'Plot size 5 Marla', fullDescription: 'Booking and after intaqal plan for 5 Marla.', features: ['Booking: 112,500', 'After Intaqal: 112,500'] },
    { id: 2, name: '10 Marla', price: '350,000', brief: 'Plot size 10 Marla', fullDescription: 'Booking and after intaqal plan for 10 Marla.', features: ['Booking: 175,000', 'After Intaqal: 175,000'] },
    { id: 3, name: '1 Kanal', price: '550,000', brief: 'Plot size 1 Kanal', fullDescription: 'Booking and after intaqal plan for 1 Kanal.', features: ['Booking: 275,000', 'After Intaqal: 275,000'] },
    { id: 4, name: '2 Kanal', price: '1,000,000', brief: 'Plot size 2 Kanal', fullDescription: 'Booking and after intaqal plan for 2 Kanal.', features: ['Booking: 500,000', 'After Intaqal: 500,000'] },
    { id: 5, name: '4 Kanal', price: '18,000,000', brief: 'Plot size 4 Kanal', fullDescription: 'Booking and after intaqal plan for 4 Kanal.', features: ['Booking: 9,000,000', 'After Intaqal: 9,000,000'] },
];

// The modal now accepts a new prop: onUploadSuccess
const PlanDetailModal = ({ plan, onClose, user, onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState(''); // This state is still useful for immediate feedback inside the modal

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setMessage('');
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a file first.');
            return;
        }
        setUploading(true);
        setMessage('');

        const formData = new FormData();
        formData.append('file', file);
        formData.append('planName', plan.name);
        formData.append('clientName', user.name);
        formData.append('clientEmail', user.email);

        try {
            const config = {
                headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${user.token}` },
            };
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/forms/upload`, formData, config);
            
            // 1. Set the immediate success message inside the modal
            setMessage(res.data.message);

            // 2. Call the parent's function to set the message on the dashboard
            const successMessageForDashboard = `Your receipt for the "${plan.name}" plan was submitted successfully. We will update you within 72 hours.`;
            onUploadSuccess(successMessageForDashboard);

            // 3. Auto-close the modal after 2 seconds for better UX
            setTimeout(() => {
                onClose();
            }, 2000);

        } catch (error) {
            setMessage(error.response?.data?.message || 'File upload failed.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>&times;</button>
                <h2>{plan.name} - {plan.price}</h2>
                <p>{plan.fullDescription}</p>
                <h4>Features:</h4>
                <ul>
                    {plan.features.map((feature, index) => <li key={index}>{feature}</li>)}
                </ul>
                <hr />
                <div className="file-upload-section">
                    <h4>Upload Payment Receipt.</h4>
                    <p>Please upload relevant files (e.g., PDF, DOCX, JPG). Max size: 10MB.</p>
                    <div className="file-input-container">
                        <label htmlFor="file-upload-input" className="file-upload-label">Choose File</label>
                        <span className="file-name-display">{file ? file.name : 'No file chosen'}</span>
                        <input id="file-upload-input" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
                    </div>
                    <button onClick={handleUpload} disabled={uploading || !file} className="upload-submit-btn">
                        {uploading ? 'Uploading...' : 'Upload Payment Receipt'}
                    </button>
                    {message && <p className={message.includes('failed') ? "error-message" : "success-message"}>{message}</p>}
                </div>
            </div>
        </div>
    );
};

const DashboardPage = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const { user } = useContext(AuthContext);
    
    // --- LIFTED STATE ---
    // This state will hold the success message to display on the dashboard itself.
    const [dashboardMessage, setDashboardMessage] = useState('');

    if (!user) return <p>Loading...</p>;
    
    // This function will clear any previous message when a new plan is selected
    const handleViewMoreClick = (plan) => {
        setDashboardMessage('');
        setSelectedPlan(plan);
    };

    return (
        <div className="dashboard-container">
            <h2>Welcome, {user.name}!</h2>
            
            {/* --- RENDER THE MESSAGE ON THE DASHBOARD --- */}
            {dashboardMessage && (
                <div className="dashboard-alert">{dashboardMessage}</div>
            )}

            <p>Please review our payment plans below. Click "VIEW MORE" for details and to upload required documents.</p>
            <div className="plans-grid">
                {paymentPlans.map((plan) => (
                    <div key={plan.id} className="plan-card">
                        <h3>{plan.name}</h3>
                        <p className="plan-price">{plan.price}</p>
                        <p>{plan.brief}</p>
                        <button onClick={() => handleViewMoreClick(plan)}>VIEW MORE</button>
                    </div>
                ))}
            </div>

            {selectedPlan && (
                <PlanDetailModal 
                    plan={selectedPlan} 
                    onClose={() => setSelectedPlan(null)}
                    user={user}
                    // --- PASS THE SETTER FUNCTION AS A PROP ---
                    onUploadSuccess={setDashboardMessage}
                />
            )}
        </div>
    );
};

export default DashboardPage;