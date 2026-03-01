import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { initializeDatabase } from './services/supabaseService';

// Import pages
import Home from './pages/home/Home';
import Login from './pages/student/Login';
import Dashboard from './pages/student/Dashboard';
import AdminLogin from './pages/admin/Login';
import AdminRegister from './pages/admin/Register';
import AdminDashboard from './pages/admin/Dashboard';

const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
});

const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const adminToken = localStorage.getItem('adminToken');
  return adminToken ? <>{children}</> : <Navigate to="/admin/login" />;
};

function App() {
  useEffect(() => {
    initializeDatabase();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<Home />} />
          
          {/* Student Routes */}
          <Route path="/student/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            } 
          />
          <Route path="/admin" element={<Navigate to="/admin/login" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;