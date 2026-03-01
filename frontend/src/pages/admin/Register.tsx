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
  Person as PersonIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { supabase } from '../../lib/supabaseClient';

const AdminRegister: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const { data: existingAdmin } = await supabase
        .from('admins')
        .select('email')
        .eq('email', email)
        .single();

      if (existingAdmin) {
        setError('An admin with this email already exists');
        setLoading(false);
        return;
      }

      const { error: insertError } = await supabase
        .from('admins')
        .insert([
          {
            name,
            email,
            password,
            role: 'admin'
          }
        ]);

      if (insertError) {
        setError('Failed to create admin account');
      } else {
        setSuccess('Admin account created successfully!');
        setTimeout(() => {
          navigate('/admin/login');
        }, 2000);
      }
    } catch (err) {
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
                Register Admin
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Create a new administrator account
              </Typography>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
                required
                InputProps={{
                  startAdornment: <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />

              <TextField
                fullWidth
                label="Email Address"
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
                helperText="Minimum 6 characters"
              />

              <TextField
                fullWidth
                label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                margin="normal"
                required
                InputProps={{
                  startAdornment: <LockIcon sx={{ mr: 1, color: 'text.secondary' }} />
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
                  {loading ? 'Creating Account...' : 'Register Admin'}
                </Button>
              </motion.div>
            </form>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button
                component={Link}
                to="/admin/login"
                startIcon={<ArrowBackIcon />}
                color="inherit"
              >
                Back to Login
              </Button>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link to="/admin/login" style={{ color: theme.palette.primary.main }}>
                  Sign in
                </Link>
              </Typography>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AdminRegister;