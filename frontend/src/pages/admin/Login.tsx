import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  useTheme,
  alpha,
  IconButton,
  InputAdornment
} from '@mui/material';
import {
  AdminPanelSettings as AdminIcon,
  Lock as LockIcon,
  Email as EmailIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  PersonAdd as PersonAddIcon
} from '@mui/icons-material';
import { supabase } from '../../lib/supabaseClient';

const AdminLogin: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Find admin by email
      const { data: admin, error: fetchError } = await supabase
        .from('admins')
        .select('*')
        .eq('email', email)
        .single();

      if (fetchError || !admin) {
        setError('Admin not found with this email');
        setLoading(false);
        return;
      }

      // Check password (in production, use bcrypt compare)
      if (admin.password !== password) {
        setError('Invalid password');
        setLoading(false);
        return;
      }

      // Store admin session
      localStorage.setItem('adminToken', `admin-token-${admin.id}`);
      localStorage.setItem('adminData', JSON.stringify({
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }));

      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity }}
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.03)',
          top: '-200px',
          right: '-200px',
        }}
      />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={24}
            sx={{
              p: 4,
              borderRadius: 4,
              backdropFilter: 'blur(10px)',
              background: alpha('#fff', 0.95),
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <AdminIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
              </motion.div>
              <Typography variant="h4" gutterBottom fontWeight="bold">
                Admin Login
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Mwenge Secondary School Clearance System
              </Typography>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
                InputProps={{
                  startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                InputProps={{
                  startAdornment: <LockIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{ mt: 3, py: 1.5 }}
                >
                  {loading ? 'Verifying...' : 'Access Admin Panel'}
                </Button>
              </motion.div>
            </form>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link to="/admin/register" style={{ color: theme.palette.primary.main }}>
                  Register here
                </Link>
              </Typography>
              <Button
                component={Link}
                to="/admin/register"
                startIcon={<PersonAddIcon />}
                color="primary"
                size="small"
              >
                New Admin
              </Button>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AdminLogin;