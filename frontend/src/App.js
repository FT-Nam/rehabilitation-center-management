import React from 'react';
import './App.css';
import Header from './layouts/Header';
import Sidebar from './layouts/Sidebar';
import Footer from './layouts/Footer';
import Breadcrumbs from './components/Breadcrumbs';
import AppRoutes from './routes/AppRoutes';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login';

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
