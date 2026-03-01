const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Student routes
router.post(
  '/student/login-lastname',
  [
    body('examNumber').matches(/^S\d{4}-\d{4}$/).withMessage('Invalid exam number format'),
    body('lastName').notEmpty().withMessage('Last name is required')
  ],
  authController.studentLoginWithLastName
);

router.post(
  '/student/login-password',
  [
    body('examNumber').matches(/^S\d{4}-\d{4}$/).withMessage('Invalid exam number format'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  authController.studentLoginWithPassword
);

router.post(
  '/student/set-password',
  auth,
  [
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  authController.studentSetPassword
);

// Admin routes
router.post(
  '/admin/login',
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password required')
  ],
  authController.adminLogin
);

module.exports = router;