import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    if (!user) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to. This is a good user experience.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    
    if (adminOnly && user.role !== 'admin') {
        // If it's an admin-only route and the user is not an admin,
        // redirect to a 'not found' or 'unauthorized' page, or just the dashboard.
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;