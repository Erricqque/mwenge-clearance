const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const auth = require('../middleware/auth');

router.get('/student/:studentId', auth, async (req, res) => {
  try {
    const comments = await Comment.find({ 
      studentId: req.params.studentId,
      $or: [
        { isPrivate: false },
        { authorId: req.user.id }
      ]
    }).sort('-createdAt');
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;