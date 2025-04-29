// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; // Adjust the import path if needed

const ProtectedRoute = ({ element }) => {
  const { user } = useContext(AuthContext);  // Access the user state from AuthContext
  if (!user) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to="/login" />;
  }
  return element;  // Return the protected route element if the user is logged in
};

export default ProtectedRoute;
