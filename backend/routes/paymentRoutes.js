const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const auth = require('../middleware/auth');

router.get('/history', auth, async (req, res) => {
  try {
    const payments = await Payment.find({ studentId: req.user.id })
      .sort('-date')
      .populate('processedBy', 'name');
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;