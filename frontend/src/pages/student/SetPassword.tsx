import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  alpha
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import SaveIcon from '@mui/icons-material/Save';
import { savePassword } from '../../services/studentService';

const SetPassword: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    
    // Get student ID from localStorage
    const studentId = localStorage.getItem('studentId');
    if (!studentId) {
      navigate('/');
      return;
    }
    
    // Save password
    setTimeout(() => {
      savePassword(studentId, password);
      setSuccess('Password set successfully!');
      setLoading(false);
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    }, 800);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Container maxWidth="sm">
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
                <LockIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
              </motion.div>
              <Typography variant="h4" gutterBottom fontWeight="bold">
                Set Your Password
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Secure your account for future logins
              </Typography>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                helperText="Minimum 6 characters"
              />

              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                margin="normal"
                required
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
                  startIcon={<SaveIcon />}
                >
                  {loading ? 'Saving...' : 'Save Password'}
                </Button>
              </motion.div>
            </form>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default SetPassword;