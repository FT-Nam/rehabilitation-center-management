import React, { useEffect } from 'react';
import './App.css';
import Header from './layouts/Header';
import Sidebar from './layouts/Sidebar';
import Footer from './layouts/Footer';
import Breadcrumbs from './components/Breadcrumbs';
import AppRoutes from './routes/AppRoutes';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { initializeAuth } from './features/auth/authSlice';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/unauthorized';

  useEffect(() => {
    // Initialize auth state from localStorage
    dispatch(initializeAuth());
  }, [dispatch]);

  if (isAuthPage) {
    return (
      <div className="page-content">
        <AppRoutes />
      </div>
    );
  }

  return (
    <div className="app-layout">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="page-content">
          <Breadcrumbs />
          <AppRoutes />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
