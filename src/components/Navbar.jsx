import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import img1 from '../assets/zemaydar_ventures.png';


const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="nav-brand">
                <img
                    src={img1}
                    alt="Zemaydar Logo"
                    style={{ width: '65px', height: '65px' }} // ✅ Set your custom size here
                />
            </Link>
            <div className="nav-links">
                <Link to="/data">Registration</Link>
                {user ? (
                    <>
                        {user.role === 'admin' && <Link to="/signup">Create User</Link>}
                        <Link to="/dashboard">Dashboard</Link>
                        <button onClick={handleLogout} className="nav-button">Logout</button>
                    </>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;