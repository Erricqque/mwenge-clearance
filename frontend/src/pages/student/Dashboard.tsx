import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Avatar,
  Chip,
  LinearProgress,
  Card,
  CardContent,
  Divider,
  IconButton,
  Tooltip,
  Tab,
  Tabs,
  useTheme,
  alpha,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Button
} from '@mui/material';
import {
  School as SchoolIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  Logout as LogoutIcon,
  Receipt as ReceiptIcon,
  Inventory as InventoryIcon,
  Book as BookIcon,
  TrendingUp as TrendingUpIcon,
  Celebration as CelebrationIcon,
  Lock as LockIcon,
  Save as SaveIcon,
  Comment as CommentIcon,
  Sync as SyncIcon
} from '@mui/icons-material';
import { 
  getStudentById, 
  savePassword,
  getComments,
  subscribeToComments 
} from '../../services/supabaseService';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [student, setStudent] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [realtimeStatus, setRealtimeStatus] = useState<string>('');

  useEffect(() => {
    const loadStudentData = async () => {
      const studentId = localStorage.getItem('studentId');
      const studentData = localStorage.getItem('studentData');
      
      if (!studentId || !studentData) {
        navigate('/');
        return;
      }
      
      const fullStudent = await getStudentById(studentId);
      if (!fullStudent) {
        navigate('/');
        return;
      }
      
      setStudent(fullStudent);
      
      const hasUserSetPassword = localStorage.getItem(`password_set_${studentId}`);
      if (!fullStudent.has_password && !hasUserSetPassword) {
        setShowPasswordDialog(true);
      }
      
      setLoading(false);
    };
    
    loadStudentData();
  }, [navigate]);

  useEffect(() => {
    const studentId = localStorage.getItem('studentId');
    if (!studentId || !student) return;
    
    const loadComments = async () => {
      const fetchedComments = await getComments(studentId);
      setComments(fetchedComments);
      console.log("📝 Loaded", fetchedComments.length, "comments from Supabase");
    };
    
    loadComments();
    
    const subscription = subscribeToComments(studentId, (newComment) => {
      console.log("🟢 REAL-TIME: New comment received!", newComment);
      setComments(prev => [newComment, ...prev]);
      setSnackbar({
        open: true,
        message: '💬 New comment from Admin!',
        severity: 'info'
      });
    });
    
    setRealtimeStatus('Connected - real-time active');
    
    return () => {
      subscription.unsubscribe();
    };
  }, [student]);

  useEffect(() => {
    if (tabValue === 3) {
      refreshComments();
    }
  }, [tabValue]);

  const refreshComments = async () => {
    const studentId = localStorage.getItem('studentId');
    if (studentId) {
      const refreshed = await getComments(studentId);
      setComments(refreshed);
      setSnackbar({
        open: true,
        message: `Comments refreshed: ${refreshed.length} found`,
        severity: 'info'
      });
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleSetPassword = async () => {
    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    const studentId = localStorage.getItem('studentId');
    if (!studentId) return;
    
    const success = await savePassword(studentId, newPassword);
    
    if (success) {
      localStorage.setItem(`password_set_${studentId}`, 'true');
      setPasswordSuccess(true);
      setPasswordError('');
      
      setTimeout(() => {
        setShowPasswordDialog(false);
        setPasswordSuccess(false);
        setNewPassword('');
        setConfirmPassword('');
        
        if (student) {
          setStudent({ ...student, has_password: true });
        }
        
        setSnackbar({
          open: true,
          message: 'Password set successfully!',
          severity: 'success'
        });
      }, 1500);
    } else {
      setPasswordError('Failed to save password');
    }
  };

  const getStatusIcon = (status: boolean) => status ? 
    <CheckIcon sx={{ color: 'success.main' }} /> : 
    <CancelIcon sx={{ color: 'error.main' }} />;

  const getStatusColor = (status: boolean) => status ? 'success' : 'error';

  if (loading) {
    return (
      <Box sx={{ 
        minHeight: '100vh',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      }}>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360, 0],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <SchoolIcon sx={{ fontSize: 80, color: '#667eea' }} />
        </motion.div>
      </Box>
    );
  }

  if (!student) return null;

  const propertiesArray = Object.entries(student.properties).map(([key, value]: [string, any]) => ({
    name: value.name,
    status: value.status,
    key
  }));

  const totalFees = student.fees.form5.amount + student.fees.form6.amount;
  const paidFees = (student.fees.form5.paid ? student.fees.form5.amount : 0) + 
                   (student.fees.form6.paid ? student.fees.form6.amount : 0);
  
  const totalSubjectFees = student.subjects.reduce((acc: number, sub: any) => acc + sub.total, 0);
  const paidSubjectFees = student.subjects.reduce((acc: number, sub: any) => 
    acc + (sub.tuition && sub.series ? sub.total : 0), 0);

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      py: 4
    }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 4,
              background: alpha(theme.palette.background.paper, 0.9),
              backdropFilter: 'blur(10px)'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  sx={{
                    width: 70,
                    height: 70,
                    bgcolor: theme.palette.primary.main,
                    fontSize: '2rem'
                  }}
                >
                  {student.full_name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {student.full_name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {student.exam_number} • {student.combination}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Chip
                  icon={<TrendingUpIcon />}
                  label={`${student.clearance_percentage}% Cleared`}
                  color={student.is_fully_cleared ? 'success' : 'warning'}
                  sx={{ fontSize: '1.1rem', py: 2 }}
                />
                <Tooltip title="Logout">
                  <IconButton onClick={handleLogout} color="primary" size="large">
                    <LogoutIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            <Box sx={{ mt: 3 }}>
              <LinearProgress
                variant="determinate"
                value={student.clearance_percentage}
                sx={{
                  height: 12,
                  borderRadius: 6,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 6,
                    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
                  }
                }}
              />
            </Box>
          </Paper>
        </motion.div>

        {!student.has_password && !showPasswordDialog && !localStorage.getItem(`password_set_${student.id}`) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Alert
              severity="info"
              action={
                <Button color="inherit" size="small" onClick={() => setShowPasswordDialog(true)}>
                  Set Password
                </Button>
              }
              sx={{ mb: 3, borderRadius: 3 }}
            >
              🔐 Secure your account by setting a password for future logins
            </Alert>
          </motion.div>
        )}

        {student.is_fully_cleared && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Alert
              icon={<CelebrationIcon />}
              severity="success"
              sx={{ mb: 3, borderRadius: 3 }}
            >
              🎉 Congratulations! You have fully cleared all items and fees!
            </Alert>
          </motion.div>
        )}

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>School Fees Summary</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Typography>Total Fees:</Typography>
                  <Typography fontWeight="bold">{totalFees.toLocaleString()} TZS</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Paid:</Typography>
                  <Typography color="success.main" fontWeight="bold">{paidFees.toLocaleString()} TZS</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Balance:</Typography>
                  <Typography color="error.main" fontWeight="bold">{(totalFees - paidFees).toLocaleString()} TZS</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ bgcolor: alpha(theme.palette.success.main, 0.05) }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Subjects Summary</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Typography>Total Subject Fees:</Typography>
                  <Typography fontWeight="bold">{totalSubjectFees.toLocaleString()} TZS</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Paid:</Typography>
                  <Typography color="success.main" fontWeight="bold">{paidSubjectFees.toLocaleString()} TZS</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Balance:</Typography>
                  <Typography color="error.main" fontWeight="bold">{(totalSubjectFees - paidSubjectFees).toLocaleString()} TZS</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper sx={{ borderRadius: 4, mb: 3 }}>
          <Tabs
            value={tabValue}
            onChange={(e, v) => setTabValue(v)}
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': { py: 2 },
              '& .Mui-selected': { color: theme.palette.primary.main }
            }}
          >
            <Tab icon={<InventoryIcon />} label="Properties" />
            <Tab icon={<BookIcon />} label="Subjects" />
            <Tab icon={<ReceiptIcon />} label="Fees" />
            <Tab icon={<CommentIcon />} label="Comments" />
          </Tabs>
        </Paper>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {propertiesArray.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={item.key}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    sx={{
                      bgcolor: item.status ? alpha(theme.palette.success.main, 0.1) : alpha(theme.palette.error.main, 0.1),
                      border: `1px solid ${item.status ? theme.palette.success.main : theme.palette.error.main}`,
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6">{item.name}</Typography>
                        {getStatusIcon(item.status)}
                      </Box>
                      <Chip
                        size="small"
                        label={item.status ? 'Cleared' : 'Pending'}
                        color={getStatusColor(item.status)}
                        sx={{ mt: 2 }}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            {student.subjects.map((subject: any, index: number) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" gutterBottom>
                          {subject.letter}. {subject.name}
                        </Typography>
                        {subject.tuition && subject.series ? (
                          <Chip size="small" label="Fully Paid" color="success" />
                        ) : (
                          <Chip size="small" label="Partial" color="warning" />
                        )}
                      </Box>
                      <Divider sx={{ my: 2 }} />
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography>Tuition (30,000 TZS):</Typography>
                        <Chip 
                          size="small"
                          label={subject.tuition ? 'Paid' : 'Pending'}
                          color={subject.tuition ? 'success' : 'error'}
                          sx={{ height: 24 }}
                        />
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography>Series (25,000 TZS):</Typography>
                        <Chip 
                          size="small"
                          label={subject.series ? 'Paid' : 'Pending'}
                          color={subject.series ? 'success' : 'error'}
                          sx={{ height: 24 }}
                        />
                      </Box>
                      
                      <Paper
                        sx={{
                          p: 2,
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          borderRadius: 2,
                          textAlign: 'center'
                        }}
                      >
                        <Typography variant="subtitle2">Total Amount</Typography>
                        <Typography variant="h5" color="primary.main">
                          {subject.total.toLocaleString()} TZS
                        </Typography>
                      </Paper>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card
                  sx={{
                    bgcolor: student.fees.form5.paid ? alpha(theme.palette.success.main, 0.1) : alpha(theme.palette.error.main, 0.1),
                    border: `1px solid ${student.fees.form5.paid ? theme.palette.success.main : theme.palette.error.main}`
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" gutterBottom>Form 5 Fees</Typography>
                    <Typography variant="h3" color="primary.main" gutterBottom>
                      {student.fees.form5.amount.toLocaleString()} TZS
                    </Typography>
                    <Chip
                      label={student.fees.form5.paid ? 'Paid' : 'Pending'}
                      color={student.fees.form5.paid ? 'success' : 'error'}
                      size="medium"
                      sx={{ mt: 2 }}
                    />
                    {student.fees.form5.paid && student.fees.form5.date && (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                        Paid on: {student.fees.form5.date}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card
                  sx={{
                    bgcolor: student.fees.form6.paid ? alpha(theme.palette.success.main, 0.1) : alpha(theme.palette.warning.main, 0.1),
                    border: `1px solid ${student.fees.form6.paid ? theme.palette.success.main : theme.palette.warning.main}`
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" gutterBottom>Form 6 Fees</Typography>
                    <Typography variant="h3" color="primary.main" gutterBottom>
                      {student.fees.form6.amount.toLocaleString()} TZS
                    </Typography>
                    <Chip
                      label={student.fees.form6.paid ? 'Paid' : 'Pending'}
                      color={student.fees.form6.paid ? 'success' : 'warning'}
                      size="medium"
                      sx={{ mt: 2 }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box>
              <Typography variant="h6">Comments from Admin</Typography>
              {realtimeStatus && (
                <Chip 
                  size="small" 
                  label={realtimeStatus} 
                  color="success" 
                  variant="outlined"
                  sx={{ mt: 0.5 }}
                />
              )}
            </Box>
            <Button 
              variant="contained" 
              size="small" 
              onClick={refreshComments}
              startIcon={<SyncIcon />}
            >
              Refresh
            </Button>
          </Box>
          
          {comments.length > 0 ? (
            <Grid container spacing={3}>
              {comments.map((comment: any, index: number) => (
                <Grid item xs={12} key={comment.id || index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Typography variant="subtitle1" fontWeight="bold" color="primary">
                            {comment.author}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {comment.date}
                          </Typography>
                        </Box>
                        <Typography variant="body1">
                          {comment.text}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <CommentIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No comments yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Admin will add comments about your clearance status here
              </Typography>
              <Typography variant="caption" color="success.main" sx={{ mt: 2, display: 'block' }}>
                {realtimeStatus}
              </Typography>
            </Paper>
          )}
        </TabPanel>

        <Dialog 
          open={showPasswordDialog} 
          onClose={() => {}}
          disableEscapeKeyDown
          PaperProps={{
            sx: { borderRadius: 4, p: 2, minWidth: 400 }
          }}
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LockIcon color="primary" />
              <Typography variant="h6">Secure Your Account</Typography>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Set a password to make future logins easier. You'll only need your exam number and password next time.
            </Typography>
            
            {passwordSuccess && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Password set successfully! Redirecting...
              </Alert>
            )}

            <TextField
              fullWidth
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              margin="normal"
              error={!!passwordError}
              helperText={passwordError || "Minimum 6 characters"}
              disabled={passwordSuccess}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              margin="normal"
              disabled={passwordSuccess}
            />
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button 
              onClick={handleSetPassword}
              variant="contained"
              fullWidth
              size="large"
              disabled={!newPassword || !confirmPassword || passwordSuccess}
              startIcon={<SaveIcon />}
            >
              {passwordSuccess ? 'Saved!' : 'Save Password'}
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity={snackbar.severity as any} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Dashboard;