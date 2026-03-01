import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  LinearProgress,
  Tabs,
  Tab,
  useTheme,
  alpha,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import {
  Search as SearchIcon,
  School as SchoolIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  Edit as EditIcon,
  Comment as CommentIcon,
  Receipt as ReceiptIcon,
  Close as CloseIcon,
  Save as SaveIcon,
  Logout as LogoutIcon,
  PersonAdd as PersonAddIcon,
  Delete as DeleteIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { 
  getAllStudents,
  updateStudentClearance,
  addComment,
  supabase
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

// Add Student Dialog Component
const AddStudentDialog: React.FC<{ open: boolean; onClose: () => void; onStudentAdded: () => void }> = 
  ({ open, onClose, onStudentAdded }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [studentData, setStudentData] = useState({
    examNumber: '',
    fullName: '',
    firstName: '',
    lastName: '',
    combination: 'PMC',
    properties: {
      softBroom: { name: "Soft Broom", status: false },
      softBrush: { name: "Soft Brush", status: false },
      hoe: { name: "Hoe", status: false },
      slasher: { name: "Slasher", status: false },
      bucket: { name: "Bucket", status: false },
      plate: { name: "Plate", status: false },
      cup: { name: "Cup", status: false },
      spoon: { name: "Spoon", status: false },
      bedSheet: { name: "Bed Sheet", status: false },
      mattress: { name: "Mattress", status: false },
      rimPapers: { name: "Rim Papers", status: false },
      schoolFees: { name: "School Fees", status: false },
      seriesContributions: { name: "Series Contributions", status: false },
      uniforms: { name: "Uniforms", status: false }
    },
    subjects: [
      { letter: "A", name: "Physics", tuition: false, series: false, total: 55000 },
      { letter: "B", name: "Mathematics", tuition: false, series: false, total: 55000 },
      { letter: "C", name: "Computer Science", tuition: false, series: false, total: 55000 },
      { letter: "D", name: "General Studies", tuition: false, series: false, total: 25000 }
    ],
    fees: {
      form5: { amount: 80000, paid: false },
      form6: { amount: 95000, paid: false }
    }
  });

  const combinations = ['PMC', 'PCM', 'PCB', 'HKL', 'HGK', 'HGL', 'EGM', 'HGE', 'CBG'];
  const steps = ['Basic Info', 'Properties', 'Subjects & Fees'];

  // Calculate clearance percentage
  const calculatePercentage = () => {
    let cleared = 0;
    const total = 20;
    
    Object.values(studentData.properties).forEach((prop: any) => { 
      if (prop.status) cleared++; 
    });
    
    studentData.subjects.forEach((sub: any) => { 
      if (sub.tuition && sub.series) cleared++; 
    });
    
    if (studentData.fees.form5.paid) cleared++;
    if (studentData.fees.form6.paid) cleared++;
    
    return Math.round((cleared / total) * 100);
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (!studentData.examNumber || !studentData.fullName || !studentData.lastName) {
        setError('Please fill in all required fields');
        return;
      }
      setError('');
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
    setError('');
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Calculate clearance percentage
      let cleared = 0;
      const total = 20;
      
      Object.values(studentData.properties).forEach((prop: any) => { 
        if (prop.status) cleared++; 
      });
      
      studentData.subjects.forEach((sub: any) => { 
        if (sub.tuition && sub.series) cleared++; 
      });
      
      if (studentData.fees.form5.paid) cleared++;
      if (studentData.fees.form6.paid) cleared++;
      
      const percentage = Math.round((cleared / total) * 100);
      const isFullyCleared = cleared === total;
      
      const newId = Date.now().toString();
      
      const newStudent = {
        id: newId,
        exam_number: studentData.examNumber,
        full_name: studentData.fullName,
        first_name: studentData.firstName || studentData.fullName.split(' ')[0],
        last_name: studentData.lastName,
        combination: studentData.combination,
        has_password: false,
        clearance_percentage: percentage,
        is_fully_cleared: isFullyCleared,
        properties: studentData.properties,
        subjects: studentData.subjects,
        fees: studentData.fees
      };

      const { error: insertError } = await supabase
        .from('students')
        .insert([newStudent]);

      if (insertError) {
        console.error('Insert error:', insertError);
        setError('Failed to add student. Exam number might already exist.');
      } else {
        setSuccess(`Student added successfully! Clearance: ${percentage}%`);
        setTimeout(() => {
          onStudentAdded();
          onClose();
        }, 1500);
      }
    } catch (err) {
      console.error('Error adding student:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handlePropertyChange = (propertyName: string, checked: boolean) => {
    setStudentData({
      ...studentData,
      properties: {
        ...studentData.properties,
        [propertyName]: {
          ...studentData.properties[propertyName as keyof typeof studentData.properties],
          status: checked
        }
      }
    });
  };

  const handleSubjectChange = (index: number, field: 'tuition' | 'series', checked: boolean) => {
    const updatedSubjects = [...studentData.subjects];
    updatedSubjects[index][field] = checked;
    setStudentData({
      ...studentData,
      subjects: updatedSubjects
    });
  };

  const handleFeeChange = (form: 'form5' | 'form6', paid: boolean) => {
    setStudentData({
      ...studentData,
      fees: {
        ...studentData.fees,
        [form]: {
          ...studentData.fees[form],
          paid
        }
      }
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 4 } }}>
      <DialogTitle>
        <Typography variant="h5">Add New Student</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Current clearance: {calculatePercentage()}%
        </Typography>
        <Stepper activeStep={activeStep} sx={{ mt: 2 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </DialogTitle>

      <DialogContent dividers>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        {activeStep === 0 && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Exam Number"
                placeholder="S0334-1002"
                value={studentData.examNumber}
                onChange={(e) => setStudentData({ ...studentData, examNumber: e.target.value.toUpperCase() })}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Combination</InputLabel>
                <Select
                  value={studentData.combination}
                  label="Combination"
                  onChange={(e) => setStudentData({ ...studentData, combination: e.target.value })}
                >
                  {combinations.map(combo => (
                    <MenuItem key={combo} value={combo}>{combo}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                value={studentData.fullName}
                onChange={(e) => setStudentData({ ...studentData, fullName: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="First Name"
                value={studentData.firstName}
                onChange={(e) => setStudentData({ ...studentData, firstName: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={studentData.lastName}
                onChange={(e) => setStudentData({ ...studentData, lastName: e.target.value })}
                required
              />
            </Grid>
          </Grid>
        )}

        {activeStep === 1 && (
          <Grid container spacing={2}>
            {Object.entries(studentData.properties).map(([key, prop]: [string, any]) => (
              <Grid item xs={12} sm={6} key={key}>
                <Button
                  fullWidth
                  variant={prop.status ? "contained" : "outlined"}
                  color={prop.status ? "success" : "primary"}
                  onClick={() => handlePropertyChange(key, !prop.status)}
                  sx={{ justifyContent: 'space-between', p: 2 }}
                >
                  <span>{prop.name}</span>
                  <span>{prop.status ? '✓ Cleared' : '○ Pending'}</span>
                </Button>
              </Grid>
            ))}
          </Grid>
        )}

        {activeStep === 2 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Subjects</Typography>
            </Grid>
            {studentData.subjects.map((subject, index) => {
              const isHalfPaid = (subject.tuition && !subject.series) || (!subject.tuition && subject.series);
              return (
                <Grid item xs={12} md={6} key={index}>
                  <Paper sx={{ 
                    p: 2,
                    bgcolor: isHalfPaid ? alpha('#ff9800', 0.1) : 'transparent',
                    border: isHalfPaid ? '1px solid #ff9800' : 'none'
                  }}>
                    <Typography variant="subtitle1" gutterBottom>
                      {subject.letter}. {subject.name}
                    </Typography>
                    {isHalfPaid && (
                      <Chip
                        size="small"
                        label="Half Paid"
                        color="warning"
                        sx={{ mb: 1 }}
                      />
                    )}
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Button
                          fullWidth
                          variant={subject.tuition ? "contained" : "outlined"}
                          color={subject.tuition ? "success" : "primary"}
                          onClick={() => handleSubjectChange(index, 'tuition', !subject.tuition)}
                          size="small"
                        >
                          Tuition
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          fullWidth
                          variant={subject.series ? "contained" : "outlined"}
                          color={subject.series ? "success" : "primary"}
                          onClick={() => handleSubjectChange(index, 'series', !subject.series)}
                          size="small"
                        >
                          Series
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              );
            })}
            
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>School Fees</Typography>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant={studentData.fees.form5.paid ? "contained" : "outlined"}
                color={studentData.fees.form5.paid ? "success" : "primary"}
                onClick={() => handleFeeChange('form5', !studentData.fees.form5.paid)}
                sx={{ p: 2 }}
              >
                Form 5: {studentData.fees.form5.amount.toLocaleString()} TZS
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant={studentData.fees.form6.paid ? "contained" : "outlined"}
                color={studentData.fees.form6.paid ? "success" : "primary"}
                onClick={() => handleFeeChange('form6', !studentData.fees.form6.paid)}
                sx={{ p: 2 }}
              >
                Form 6: {studentData.fees.form6.amount.toLocaleString()} TZS
              </Button>
            </Grid>
          </Grid>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        {activeStep > 0 && (
          <Button onClick={handleBack} disabled={loading}>
            Back
          </Button>
        )}
        {activeStep < steps.length - 1 ? (
          <Button onClick={handleNext} variant="contained" disabled={loading}>
            Next
          </Button>
        ) : (
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color="success"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Student'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

// Delete Confirmation Dialog
const DeleteConfirmDialog: React.FC<{ 
  open: boolean; 
  student: any; 
  onClose: () => void; 
  onConfirm: () => void;
  loading: boolean;
}> = ({ open, student, onClose, onConfirm, loading }) => {
  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { borderRadius: 4, minWidth: 400 } }}>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'error.main' }}>
          <WarningIcon />
          <Typography variant="h6">Confirm Deletion</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Alert severity="warning" sx={{ mb: 2 }}>
          This action cannot be undone!
        </Alert>
        <Typography variant="body1" gutterBottom>
          Are you sure you want to delete:
        </Typography>
        <Typography variant="h6" sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 2 }}>
          {student?.full_name} ({student?.exam_number})
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          All comments and clearance data will be permanently removed.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          disabled={loading}
          startIcon={<DeleteIcon />}
        >
          {loading ? 'Deleting...' : 'Delete Student'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const AdminDashboard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [filterCombination, setFilterCombination] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Add/Delete states
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<any>(null);
  const [deleting, setDeleting] = useState(false);
  
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin/login');
      return;
    }
    loadStudents();
  }, [navigate]);

  const loadStudents = async () => {
    setLoading(true);
    const fetchedStudents = await getAllStudents();
    setStudents(fetchedStudents);
    setLoading(false);
  };

  const uniqueCombinations = Array.from(new Set(students.map(s => s.combination)));
  const combinations = ['all', ...uniqueCombinations];
  
  const filteredStudents = students.filter(s => {
    const matchesSearch = s.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         s.exam_number.includes(searchTerm) ||
                         s.combination.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCombination = filterCombination === 'all' || s.combination === filterCombination;
    
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'cleared' && s.is_fully_cleared) ||
                         (filterStatus === 'pending' && !s.is_fully_cleared);
    
    return matchesSearch && matchesCombination && matchesStatus;
  });

  // Calculate half-paid items for a student
  const getHalfPaidCount = (student: any) => {
    return student.subjects.filter((sub: any) => 
      (sub.tuition && !sub.series) || (!sub.tuition && sub.series)
    ).length;
  };

  const stats = {
    total: students.length,
    fullyCleared: students.filter(s => s.is_fully_cleared).length,
    pending: students.filter(s => !s.is_fully_cleared).length,
    halfPaid: students.reduce((acc, s) => acc + getHalfPaidCount(s), 0),
    averageClearance: students.length > 0 ? Math.round(
      students.reduce((acc, s) => acc + s.clearance_percentage, 0) / students.length
    ) : 0,
    totalDebt: students.reduce((acc, s) => {
      const totalFees = s.fees.form5.amount + s.fees.form6.amount;
      const paidFees = (s.fees.form5.paid ? s.fees.form5.amount : 0) + 
                      (s.fees.form6.paid ? s.fees.form6.amount : 0);
      const subjectDebt = s.subjects.reduce((subAcc: number, sub: any) => 
        subAcc + (sub.tuition && sub.series ? 0 : sub.total), 0);
      return acc + (totalFees - paidFees) + subjectDebt;
    }, 0)
  };

  const handleEditStudent = (student: any) => {
    setSelectedStudent(student);
    setEditDialogOpen(true);
  };

  const handleAddComment = (student: any) => {
    setSelectedStudent(student);
    setCommentDialogOpen(true);
  };

  const handleDeleteClick = (student: any) => {
    setStudentToDelete(student);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!studentToDelete) return;
    
    setDeleting(true);
    
    try {
      await supabase
        .from('comments')
        .delete()
        .eq('student_id', studentToDelete.id);
      
      const { error } = await supabase
        .from('students')
        .delete()
        .eq('id', studentToDelete.id);
      
      if (error) throw error;
      
      setSnackbar({
        open: true,
        message: `✅ Student ${studentToDelete.full_name} deleted`,
        severity: 'success'
      });
      
      await loadStudents();
      
    } catch (err) {
      console.error('Delete error:', err);
      setSnackbar({
        open: true,
        message: '❌ Failed to delete student',
        severity: 'error'
      });
    } finally {
      setDeleting(false);
      setDeleteDialogOpen(false);
      setStudentToDelete(null);
    }
  };

  const handleSaveComment = async () => {
    if (!selectedStudent || !commentText.trim()) return;
    
    const result = await addComment(selectedStudent.id, {
      author: 'Admin',
      text: commentText
    });
    
    if (result) {
      await loadStudents();
      setCommentDialogOpen(false);
      setCommentText('');
      setSnackbar({
        open: true,
        message: '✅ Comment added! Student will see it immediately.',
        severity: 'success'
      });
    }
  };

  const handleClearItem = async (studentId: string, type: 'property' | 'subject' | 'fee', itemName: string) => {
    const updated = await updateStudentClearance(studentId, type, itemName, true);
    
    if (updated) {
      await loadStudents();
      setEditDialogOpen(false);
      setSnackbar({
        open: true,
        message: `${itemName} marked as cleared.`,
        severity: 'success'
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    navigate('/admin/login');
  };

  const getStatusChip = (status: boolean) => (
    <Chip
      size="small"
      icon={status ? <CheckIcon /> : <CancelIcon />}
      label={status ? 'Cleared' : 'Pending'}
      color={status ? 'success' : 'error'}
      sx={{ minWidth: 80 }}
    />
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <SchoolIcon sx={{ fontSize: 60, color: 'primary.main' }} />
        </motion.div>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      py: 4
    }}>
      <Container maxWidth="xl">
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
              background: alpha(theme.palette.background.paper, 0.95),
              backdropFilter: 'blur(10px)'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  Admin Dashboard
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Manage Student Clearance
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  variant="contained" 
                  color="success"
                  onClick={() => setAddDialogOpen(true)}
                  startIcon={<PersonAddIcon />}
                >
                  Add Student
                </Button>
                <Button 
                  variant="outlined" 
                  color="error"
                  onClick={handleLogout}
                  startIcon={<LogoutIcon />}
                >
                  Logout
                </Button>
              </Box>
            </Box>
          </Paper>
        </motion.div>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={2.4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card sx={{ 
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                color: 'white',
                borderRadius: 4,
                boxShadow: '0 10px 20px rgba(255,215,0,0.3)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 70%)',
                  opacity: 0.6
                }
              }}>
                <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  >
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
                      {stats.total}
                    </Typography>
                  </motion.div>
                  <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.95)', fontWeight: 500 }}>
                    🎓 Total Students
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', display: 'block', mt: 1 }}>
                    Enrolled in system
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card sx={{ 
                background: 'linear-gradient(135deg, #00b09b 0%, #96c93d 100%)',
                color: 'white',
                borderRadius: 4,
                boxShadow: '0 10px 20px rgba(0,176,155,0.3)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.3) 0%, transparent 70%)',
                  opacity: 0.6
                }
              }}>
                <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 0.5 }}
                  >
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
                      {stats.fullyCleared}
                    </Typography>
                  </motion.div>
                  <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.95)', fontWeight: 500 }}>
                    ✅ Fully Cleared
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', display: 'block', mt: 1 }}>
                    All items completed
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card sx={{ 
                background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)',
                color: 'white',
                borderRadius: 4,
                boxShadow: '0 10px 20px rgba(255,107,107,0.3)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.3) 0%, transparent 70%)',
                  opacity: 0.6
                }
              }}>
                <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 1 }}
                  >
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
                      {stats.halfPaid}
                    </Typography>
                  </motion.div>
                  <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.95)', fontWeight: 500 }}>
                    ⚠️ Half-Paid Items
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', display: 'block', mt: 1 }}>
                    Partial payments
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card sx={{ 
                background: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)',
                color: 'white',
                borderRadius: 4,
                boxShadow: '0 10px 20px rgba(33,147,176,0.3)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'radial-gradient(circle at 70% 70%, rgba(255,255,255,0.3) 0%, transparent 70%)',
                  opacity: 0.6
                }
              }}>
                <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 1.5 }}
                  >
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
                      {stats.averageClearance}%
                    </Typography>
                  </motion.div>
                  <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.95)', fontWeight: 500 }}>
                    📊 Average Clearance
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', display: 'block', mt: 1 }}>
                    School-wide progress
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card sx={{ 
                background: 'linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)',
                color: 'white',
                borderRadius: 4,
                boxShadow: '0 10px 20px rgba(142,45,226,0.3)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.3) 0%, transparent 70%)',
                  opacity: 0.6
                }
              }}>
                <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 2 }}
                  >
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
                      {stats.totalDebt.toLocaleString()} TZS
                    </Typography>
                  </motion.div>
                  <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.95)', fontWeight: 500 }}>
                    💰 Total Outstanding Debt
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', display: 'block', mt: 1 }}>
                    Pending payments
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        <Paper sx={{ p: 2, mb: 3, borderRadius: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search by name, exam number, or combination..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Combination</InputLabel>
                <Select
                  value={filterCombination}
                  label="Combination"
                  onChange={(e) => setFilterCombination(e.target.value)}
                >
                  {combinations.map(combo => (
                    <MenuItem key={combo} value={combo}>
                      {combo === 'all' ? 'All Combinations' : combo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filterStatus}
                  label="Status"
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <MenuItem value="all">All Students</MenuItem>
                  <MenuItem value="cleared">Fully Cleared</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ borderRadius: 4, overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
                <TableRow>
                  <TableCell>Student</TableCell>
                  <TableCell>Exam Number</TableCell>
                  <TableCell>Combination</TableCell>
                  <TableCell>Progress</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Half Paid</TableCell>
                  <TableCell>Debt (TZS)</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents.map((student) => {
                  const totalFees = student.fees.form5.amount + student.fees.form6.amount;
                  const paidFees = (student.fees.form5.paid ? student.fees.form5.amount : 0) + 
                                  (student.fees.form6.paid ? student.fees.form6.amount : 0);
                  const subjectDebt = student.subjects.reduce((acc: number, sub: any) => 
                    acc + (sub.tuition && sub.series ? 0 : sub.total), 0);
                  const totalDebt = (totalFees - paidFees) + subjectDebt;
                  const halfPaidCount = getHalfPaidCount(student);

                  return (
                    <TableRow key={student.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.main }}>
                            {student.full_name.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight="bold">
                              {student.full_name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {student.first_name} {student.last_name}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>{student.exam_number}</TableCell>
                      <TableCell>{student.combination}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 120 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={student.clearance_percentage} 
                            sx={{ width: 80, height: 8, borderRadius: 4 }}
                          />
                          <Typography variant="body2">{student.clearance_percentage}%</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {getStatusChip(student.is_fully_cleared)}
                      </TableCell>
                      <TableCell>
                        {halfPaidCount > 0 ? (
                          <Chip
                            size="small"
                            label={`${halfPaidCount} items`}
                            color="warning"
                            variant="outlined"
                          />
                        ) : (
                          <Typography variant="caption" color="text.secondary">None</Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Typography 
                          color={totalDebt > 0 ? 'error.main' : 'success.main'}
                          fontWeight="bold"
                        >
                          {totalDebt.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={() => handleEditStudent(student)}
                          title="Edit Clearance"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          color="info"
                          onClick={() => handleAddComment(student)}
                          title="Add Comment"
                        >
                          <CommentIcon />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => handleDeleteClick(student)}
                          title="Delete Student"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Edit Dialog */}
        <Dialog 
          open={editDialogOpen} 
          onClose={() => setEditDialogOpen(false)}
          maxWidth="md"
          fullWidth
          PaperProps={{ sx: { borderRadius: 4 } }}
        >
          {selectedStudent && (
            <>
              <DialogTitle>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6">Edit Clearance - {selectedStudent.full_name}</Typography>
                  <IconButton onClick={() => setEditDialogOpen(false)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </DialogTitle>
              <DialogContent dividers>
                <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} sx={{ mb: 2 }}>
                  <Tab label="Properties" />
                  <Tab label="Subjects" />
                  <Tab label="Fees" />
                </Tabs>

                <TabPanel value={tabValue} index={0}>
                  <Grid container spacing={2}>
                    {Object.entries(selectedStudent.properties).map(([key, prop]: [string, any]) => (
                      <Grid item xs={12} sm={6} key={key}>
                        <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography>{prop.name}</Typography>
                          <Box>
                            <Chip
                              size="small"
                              label={prop.status ? 'Cleared' : 'Pending'}
                              color={prop.status ? 'success' : 'error'}
                              sx={{ mr: 1 }}
                            />
                            {!prop.status && (
                              <Button 
                                size="small" 
                                variant="contained"
                                onClick={() => handleClearItem(selectedStudent.id, 'property', prop.name)}
                              >
                                Mark Cleared
                              </Button>
                            )}
                          </Box>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  <Grid container spacing={2}>
                    {selectedStudent.subjects.map((subject: any, index: number) => {
                      const isHalfPaid = (subject.tuition && !subject.series) || (!subject.tuition && subject.series);
                      const isFullyPaid = subject.tuition && subject.series;
                      const isPending = !subject.tuition && !subject.series;
                      
                      return (
                        <Grid item xs={12} key={index}>
                          <Paper sx={{ 
                            p: 2, 
                            bgcolor: isFullyPaid ? alpha(theme.palette.success.main, 0.1) :
                                    isHalfPaid ? alpha(theme.palette.warning.main, 0.1) :
                                    alpha(theme.palette.error.main, 0.1)
                          }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                              <Typography variant="subtitle1" fontWeight="bold">
                                {subject.letter}. {subject.name}
                              </Typography>
                              <Chip
                                size="small"
                                label={isFullyPaid ? 'Fully Paid' : isHalfPaid ? 'Half Paid' : 'Pending'}
                                color={isFullyPaid ? 'success' : isHalfPaid ? 'warning' : 'error'}
                              />
                            </Box>
                            
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Typography>Tuition:</Typography>
                                  <Chip
                                    size="small"
                                    label={subject.tuition ? 'Paid' : 'Pending'}
                                    color={subject.tuition ? 'success' : 'error'}
                                  />
                                </Box>
                              </Grid>
                              <Grid item xs={6}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Typography>Series:</Typography>
                                  <Chip
                                    size="small"
                                    label={subject.series ? 'Paid' : 'Pending'}
                                    color={subject.series ? 'success' : 'error'}
                                  />
                                </Box>
                              </Grid>
                            </Grid>
                            
                            {isHalfPaid && (
                              <Alert severity="warning" sx={{ mt: 2 }}>
                                ⚠️ Partially paid - {!subject.tuition ? 'Tuition' : 'Series'} still pending
                              </Alert>
                            )}
                          </Paper>
                        </Grid>
                      );
                    })}
                  </Grid>
                </TabPanel>

                <TabPanel value={tabValue} index={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>Form 5 Fees</Typography>
                        <Typography variant="h4" color="primary" gutterBottom>
                          {selectedStudent.fees.form5.amount.toLocaleString()} TZS
                        </Typography>
                        <Chip
                          label={selectedStudent.fees.form5.paid ? 'Paid' : 'Pending'}
                          color={selectedStudent.fees.form5.paid ? 'success' : 'error'}
                          sx={{ mb: 2 }}
                        />
                        {!selectedStudent.fees.form5.paid && (
                          <Button 
                            fullWidth 
                            variant="contained"
                            onClick={() => handleClearItem(selectedStudent.id, 'fee', 'Form 5')}
                          >
                            Mark Form 5 as Paid
                          </Button>
                        )}
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>Form 6 Fees</Typography>
                        <Typography variant="h4" color="primary" gutterBottom>
                          {selectedStudent.fees.form6.amount.toLocaleString()} TZS
                        </Typography>
                        <Chip
                          label={selectedStudent.fees.form6.paid ? 'Paid' : 'Pending'}
                          color={selectedStudent.fees.form6.paid ? 'success' : 'warning'}
                          sx={{ mb: 2 }}
                        />
                        {!selectedStudent.fees.form6.paid && (
                          <Button 
                            fullWidth 
                            variant="contained"
                            onClick={() => handleClearItem(selectedStudent.id, 'fee', 'Form 6')}
                          >
                            Mark Form 6 as Paid
                          </Button>
                        )}
                      </Paper>
                    </Grid>
                  </Grid>
                </TabPanel>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setEditDialogOpen(false)}>Close</Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        {/* Comment Dialog */}
        <Dialog 
          open={commentDialogOpen} 
          onClose={() => setCommentDialogOpen(false)}
          PaperProps={{ sx: { borderRadius: 4, minWidth: 400 } }}
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CommentIcon color="info" />
              <Typography variant="h6">
                Add Comment for {selectedStudent?.full_name}
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Enter comment about student's clearance status..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCommentDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleSaveComment} 
              variant="contained"
              disabled={!commentText.trim()}
              startIcon={<SaveIcon />}
            >
              Save Comment
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Student Dialog */}
        <AddStudentDialog
          open={addDialogOpen}
          onClose={() => setAddDialogOpen(false)}
          onStudentAdded={loadStudents}
        />

        {/* Delete Confirmation Dialog */}
        <DeleteConfirmDialog
          open={deleteDialogOpen}
          student={studentToDelete}
          onClose={() => {
            setDeleteDialogOpen(false);
            setStudentToDelete(null);
          }}
          onConfirm={handleDeleteConfirm}
          loading={deleting}
        />

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

export default AdminDashboard;