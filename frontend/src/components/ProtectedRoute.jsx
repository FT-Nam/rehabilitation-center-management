import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../features/auth/authSlice';

export default function ProtectedRoute({ children, requiredPermissions = [], requiredRoles = [] }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(state => state.auth.user);
  const location = useLocation();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has required permissions
  if (requiredPermissions.length > 0) {
    const hasPermission = requiredPermissions.some(permission => 
      user?.permissions?.includes(permission)
    );
    if (!hasPermission) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Check if user has required roles
  if (requiredRoles.length > 0) {
    const hasRole = requiredRoles.includes(user?.role);
    if (!hasRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
}
