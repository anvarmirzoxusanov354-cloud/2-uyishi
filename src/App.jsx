import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layout/MainLayout';


import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Teachers from './pages/Teachers';
import Classes from './pages/Classes';
import Students from './pages/Students';
import Gifts from './pages/Gifts';
import Management from './pages/Management';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="teachers" element={<Teachers />} />
            <Route path="classes" element={<Classes />} />
            <Route path="students" element={<Students />} />
            <Route path="gifts" element={<Gifts />} />
            <Route path="management" element={<Management />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
