import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errorMsg, setErrorMsg] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, formData);
            login(res.data); // Save user data and token in context/localStorage
            navigate('/dashboard'); // Redirect to dashboard
        } catch (error) {
            setErrorMsg(error.response?.data?.message || 'Login failed.');
        }
    };

    return (
        <div className="form-container">
            <h2>Client Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
            {errorMsg && <p className="error-message">{errorMsg}</p>}
        </div>
    );
};

export default LoginPage;