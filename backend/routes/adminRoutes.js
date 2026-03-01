const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const { isAdmin } = require('../middleware/adminAuth');

router.use(auth);
router.use(isAdmin);

router.get('/dashboard', adminController.getDashboardStats);
router.get('/students', adminController.getStudents);
router.get('/students/:id', adminController.getStudentDetails);
router.put('/students/:id', adminController.updateStudent);
router.post('/payments/process', adminController.processPayment);
router.post('/comments/add', adminController.addComment);
router.post('/bulk-clear', adminController.bulkClearItems);

module.exports = router;