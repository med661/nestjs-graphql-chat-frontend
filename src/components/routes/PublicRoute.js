import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom'; // Import the Routes component
import { useSelector } from 'react-redux';
const PublicRoute = ({ element, ...rest }) => {
    const user = useSelector(state => state.auth.user);

    return user ? <Navigate to="/dashboard" /> : <Routes> <React.Fragment> <Route {...rest} element={element} /> </React.Fragment> </Routes>; // Wrap the Route component inside the React.Fragment component
};

export default PublicRoute;