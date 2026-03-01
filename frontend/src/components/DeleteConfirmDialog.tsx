import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Typography,
  Alert
} from '@mui/material';
import { Delete as DeleteIcon, Warning as WarningIcon } from '@mui/icons-material';

interface DeleteConfirmDialogProps {
  open: boolean;
  student: any;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  open,
  student,
  onClose,
  onConfirm,
  loading = false
}) => {
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
        <DialogContentText>
          Are you sure you want to delete student:
        </DialogContentText>
        <Typography variant="h6" sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 2 }}>
          {student?.full_name} ({student?.exam_number})
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          All data including comments and clearance status will be permanently removed.
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

export default DeleteConfirmDialog;