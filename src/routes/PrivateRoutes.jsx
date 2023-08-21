import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';


const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className='min-h-screen flex justify-center items-center'>Loading...</div>
    }

    if (user) {
        return children;
    }
    return <Navigate to='/' state={{ from: location }} replace></Navigate>
};

export default PrivateRoutes;