import React, { useState } from 'react';
import axios from 'axios';

const DataFormPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        fatherName: '',
        cnic: '',
        address: '',
        mobileNumber: '',
        email: ''
    });
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
            setFormData({ name: '', fatherName: '', cnic: '', address: '', mobileNumber: '', email: '' });
        } catch (error) {
            setErrorMsg(error.response?.data?.message || 'An error occurred.');
        }
    };

    return (
        <div className="form-container">
            <h2>Registration</h2>
            <p>Fill out this form and our team will get in touch with you.</p>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <input type="text" name="fatherName" placeholder="Father Name" value={formData.fatherName} onChange={handleChange} required />
                <input type="text" name="cnic" placeholder="CNIC (e.g., 12345-1234567-1)" value={formData.cnic} onChange={handleChange} required />
                <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
                <input type="tel" name="mobileNumber" placeholder="Mobile Number" value={formData.mobileNumber} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                <button type="submit">Submit</button>
            </form>
            {responseMsg && <p className="success-message">{responseMsg}</p>}
            {errorMsg && <p className="error-message">{errorMsg}</p>}
        </div>
    );
};

export default DataFormPage;