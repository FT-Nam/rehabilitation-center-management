import React from 'react';
import { Outlet } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

const PrivateRoute = () => {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  );
};

export default PrivateRoute;

