import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Portfolio from './pages/Portfolio';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Portfolio />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/admin/*"
                element={
                  <PrivateRoute>
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </PortfolioProvider>
    </AuthProvider>
  );
}

export default App;