const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/clearance', studentController.getClearanceData);
router.get('/payments', studentController.getPaymentHistory);
router.get('/comments', studentController.getComments);

module.exports = router;