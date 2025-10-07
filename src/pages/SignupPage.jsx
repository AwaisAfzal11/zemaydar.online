import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const SignupPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [responseMsg, setResponseMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const { user } = useContext(AuthContext);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResponseMsg('');
        setErrorMsg('');
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, formData, config);
            setResponseMsg(res.data.message + ` Use password: ${formData.password}`);
            setFormData({ name: '', email: '', password: '' });
        } catch (error) {
            setErrorMsg(error.response?.data?.message || 'An error occurred.');
        }
    };

    return (
        <div className="form-container">
            <h2>Create New Client Account</h2>
            <p>This page is for admins only.</p>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Client's Name" value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Client's Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Create a Password" value={formData.password} onChange={handleChange} required />
                <button type="submit">Create User</button>
            </form>
            {responseMsg && <p className="success-message">{responseMsg}</p>}
            {errorMsg && <p className="error-message">{errorMsg}</p>}
        </div>
    );
};

export default SignupPage;