import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import HomeIcon from '@mui/icons-material/Home';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
  alpha,
  IconButton,
  Tooltip
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import { students } from '../../services/studentService';
const Login: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [method, setMethod] = useState<'lastname' | 'password'>('lastname');
  const [examNumber, setExamNumber] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLastNameLogin = () => {
    // Find student by exam number and last name
    const student = students.find(s => 
      s.examNumber === examNumber && 
      s.lastName.toLowerCase() === lastName.toLowerCase()
    );
    
    if (!student) {
      setError('Invalid exam number or last name');
      setLoading(false);
      return;
    }

    // Store student data
    localStorage.setItem('token', `student-token-${student.id}`);
    localStorage.setItem('userRole', 'student');
    localStorage.setItem('studentId', student.id);
    localStorage.setItem('studentData', JSON.stringify({
      id: student.id,
      examNumber: student.examNumber,
      fullName: student.fullName,
      combination: student.combination
    }));

    navigate('/dashboard');
  };

  const handlePasswordLogin = () => {
    // Find student by exam number
    const student = students.find(s => s.examNumber === examNumber);
    
    if (!student) {
      setError('Student not found');
      setLoading(false);
      return;
    }

    // In a real app, verify password. For demo, accept any password after first login
    // For now, just check if student exists
    if (!student.hasPassword) {
      setError('Password not set. Please use last name login first.');
      setLoading(false);
      return;
    }

    // Store student data
    localStorage.setItem('token', `student-token-${student.id}`);
    localStorage.setItem('userRole', 'student');
    localStorage.setItem('studentId', student.id);
    localStorage.setItem('studentData', JSON.stringify({
      id: student.id,
      examNumber: student.examNumber,
      fullName: student.fullName,
      combination: student.combination
    }));

    navigate('/dashboard');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      if (method === 'lastname') {
        handleLastNameLogin();
      } else {
        handlePasswordLogin();
      }
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
      {/* Animated Background Circles */}
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
          background: 'rgba(255,255,255,0.1)',
          top: '-200px',
          right: '-200px',
        }}
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          rotate: [0, -90, 0],
        }}
        transition={{ duration: 15, repeat: Infinity }}
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          bottom: '-100px',
          left: '-100px',
        }}
      />

      {/* Home Button - Top Left */}
      <Box sx={{ position: 'fixed', top: 20, left: 20, zIndex: 10 }}>
        <Tooltip title="Back to Home">
          <IconButton
            onClick={() => navigate('/')}
            sx={{
              bgcolor: alpha('#fff', 0.2),
              backdropFilter: 'blur(10px)',
              color: 'white',
              '&:hover': {
                bgcolor: alpha('#fff', 0.3),
              },
              width: 48,
              height: 48
            }}
          >
            <HomeIcon />
          </IconButton>
        </Tooltip>
      </Box>

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
                <SchoolIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
              </motion.div>
              <Typography variant="h4" gutterBottom fontWeight="bold">
                MWENGE SECONDARY SCHOOL
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Student Clearance Portal
              </Typography>
            </Box>

            <ToggleButtonGroup
              color="primary"
              value={method}
              exclusive
              onChange={(e, value) => value && setMethod(value)}
              fullWidth
              sx={{ mb: 3 }}
            >
              <ToggleButton value="lastname">
                <PersonIcon sx={{ mr: 1 }} /> First Time
              </ToggleButton>
              <ToggleButton value="password">
                <LockIcon sx={{ mr: 1 }} /> Returning
              </ToggleButton>
            </ToggleButtonGroup>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Examination Number"
                placeholder="S0334-0979"
                value={examNumber}
                onChange={(e) => setExamNumber(e.target.value.toUpperCase())}
                margin="normal"
                required
                InputProps={{
                  startAdornment: <SchoolIcon sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />

              {method === 'lastname' ? (
                <TextField
                  fullWidth
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  margin="normal"
                  required
                  InputProps={{
                    startAdornment: <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                />
              ) : (
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  margin="normal"
                  required
                  InputProps={{
                    startAdornment: <LockIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                />
              )}

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
                  startIcon={<LoginIcon />}
                >
                  {loading ? 'Verifying...' : 'Access Clearance'}
                </Button>
              </motion.div>
            </form>

            <Typography variant="caption" display="block" sx={{ mt: 2, textAlign: 'center', color: 'text.secondary' }}>
              Try: S0334-0979 / MAGANDA
            </Typography>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Login;