import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Paper
} from '@mui/material';
import { supabase } from '../lib/supabaseClient';

interface AddStudentDialogProps {
  open: boolean;
  onClose: () => void;
  onStudentAdded: () => void;
}

const AddStudentDialog: React.FC<AddStudentDialogProps> = ({ open, onClose, onStudentAdded }) => {
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
            {studentData.subjects.map((subject, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    {subject.letter}. {subject.name}
                  </Typography>
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
            ))}
            
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

export default AddStudentDialog;