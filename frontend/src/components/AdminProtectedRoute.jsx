import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminState } from '../context/AdminStateContext';

export default function AdminProtectedRoute({ children }) {
  const { isAdminAuthenticated } = useAdminState();
  const location = useLocation();

  if (!isAdminAuthenticated) {
    // Redirect unauthenticated user to login, preserving intended route
    return <Navigate to="/login" state={{ from: location, requireAdmin: true }} replace />;
  }

  return children;
}
