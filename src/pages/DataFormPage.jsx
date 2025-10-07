import React, { useState } from 'react';
import axios from 'axios';

const DataFormPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [responseMsg, setResponseMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResponseMsg('');
        setErrorMsg('');
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/forms/data-gathering`, formData);
            setResponseMsg(res.data.message);
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            setErrorMsg(error.response?.data?.message || 'An error occurred.');
        }
    };

    return (
        <div className="form-container">
            <h2>Contact Us</h2>
            <p>Fill out this form and our team will get in touch with you.</p>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                <input type="tel" name="phone" placeholder="Your Phone Number" value={formData.phone} onChange={handleChange} required />
                <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required></textarea>
                <button type="submit">Submit</button>
            </form>
            {responseMsg && <p className="success-message">{responseMsg}</p>}
            {errorMsg && <p className="error-message">{errorMsg}</p>}
        </div>
    );
};

export default DataFormPage;