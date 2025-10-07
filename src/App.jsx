import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import DataFormPage from './pages/DataFormPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/data" element={<DataFormPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Client Route */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Protected Admin Route */}
          <Route 
            path="/signup" 
            element={
              <ProtectedRoute adminOnly={true}>
                <SignupPage />
              </ProtectedRoute>
            } 
          />

          {/* Add a 404 Not Found route if you like */}
          <Route path="*" element={<h2>404: Page Not Found</h2>} />
        </Routes>
      </main>
    </>
  );
}

export default App;