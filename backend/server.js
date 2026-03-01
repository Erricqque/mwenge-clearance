const Student = require('../models/Student');
const Admin = require('../models/Admin');
const Payment = require('../models/Payment');
const Comment = require('../models/Comment');
const bcrypt = require('bcryptjs');

// Get Dashboard Stats
exports.getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const activeStudents = await Student.countDocuments({ isActive: true });
    const fullyCleared = await Student.countDocuments({ isFullyCleared: true });
    
    const totalPayments = await Payment.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const recentPayments = await Payment.find()
      .sort('-date')
      .limit(10)
      .populate('studentId', 'fullName examNumber');

    const recentComments = await Comment.find()
      .sort('-createdAt')
      .limit(10)
      .populate('studentId', 'fullName examNumber');

    res.json({
      stats: {
        totalStudents,
        activeStudents,
        fullyCleared,
        pendingClearance: totalStudents - fullyCleared,
        totalRevenue: totalPayments[0]?.total || 0
      },
      recentPayments,
      recentComments
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get All Students with Filters
exports.getStudents = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      search, 
      combination, 
      status,
      sortBy = 'examNumber',
      sortOrder = 'asc'
    } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { examNumber: new RegExp(search, 'i') },
        { fullName: new RegExp(search, 'i') },
        { admissionNumber: new RegExp(search, 'i') }
      ];
    }

    if (combination) query.combination = combination;
    
    if (status === 'cleared') query.isFullyCleared = true;
    if (status === 'pending') query.isFullyCleared = false;

    const students = await Student.find(query)
      .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Student.countDocuments(query);

    res.json({
      students,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Single Student Details
exports.getStudentDetails = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate({
        path: 'comments.authorId',
        select: 'name role'
      })
      .populate({
        path: 'payments.processedBy',
        select: 'name'
      });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Process Payment
exports.processPayment = async (req, res) => {
  try {
    const { studentId, type, category, amount, paymentMethod, notes } = req.body;
    const io = req.app.get('io');

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Create payment record
    const payment = new Payment({
      studentId,
      studentName: student.fullName,
      examNumber: student.examNumber,
      type,
      category,
      amount,
      paymentMethod,
      notes,
      processedBy: req.user.id
    });

    await payment.save();

    // Update student records based on payment type
    if (type === 'tuition' || type === 'series') {
      const subject = student.subjects.find(s => 
        `${s.letter}. ${s.name}` === category
      );
      if (subject) {
        if (type === 'tuition') subject.tuitionPaid = true;
        if (type === 'series') subject.seriesPaid = true;
        subject.paid = subject.tuitionPaid && subject.seriesPaid;
      }
    } else if (type === 'form5_fee') {
      student.fees.form5.paid = true;
      student.fees.form5.paidDate = new Date();
    } else if (type === 'form6_fee') {
      student.fees.form6.paid = true;
      student.fees.form6.paidDate = new Date();
    } else if (type === 'property') {
      if (student.properties[category]) {
        student.properties[category].status = true;
        student.properties[category].clearedDate = new Date();
      }
    }

    student.payments.push(payment._id);
    await student.save();

    // Emit real-time update
    io.emit('payment-processed', {
      studentId,
      payment,
      updatedClearance: student.clearancePercentage
    });

    res.json({
      success: true,
      message: 'Payment processed successfully',
      payment,
      clearancePercentage: student.clearancePercentage
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add Comment
exports.addComment = async (req, res) => {
  try {
    const { studentId, text, type, isPrivate } = req.body;
    const io = req.app.get('io');

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const comment = {
      studentId,
      studentName: student.fullName,
      text,
      type,
      isPrivate,
      author: req.user.name,
      authorId: req.user.id,
      authorRole: req.user.role
    };

    const newComment = await Comment.create(comment);

    student.comments.push(newComment._id);
    await student.save();

    // Emit real-time update
    io.emit('new-comment', {
      studentId,
      comment: newComment
    });

    res.json({
      success: true,
      message: 'Comment added successfully',
      comment: newComment
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Student
exports.updateStudent = async (req, res) => {
  try {
    const updates = req.body;
    updates.updatedBy = req.user.id;
    updates.updatedAt = new Date();

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({
      success: true,
      message: 'Student updated successfully',
      student
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Bulk Clear Items
exports.bulkClearItems = async (req, res) => {
  try {
    const { studentId, items } = req.body;
    const io = req.app.get('io');

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    items.forEach(item => {
      if (item.type === 'property' && student.properties[item.name]) {
        student.properties[item.name].status = true;
        student.properties[item.name].clearedDate = new Date();
      } else if (item.type === 'subject') {
        const subject = student.subjects.find(s => 
          `${s.letter}. ${s.name}` === item.name
        );
        if (subject) {
          if (item.subType === 'tuition') subject.tuitionPaid = true;
          if (item.subType === 'series') subject.seriesPaid = true;
          subject.paid = subject.tuitionPaid && subject.seriesPaid;
        }
      } else if (item.type === 'fee') {
        if (item.name === 'Form 5') student.fees.form5.paid = true;
        if (item.name === 'Form 6') student.fees.form6.paid = true;
      }
    });

    await student.save();

    io.emit('bulk-clearance', {
      studentId,
      updatedClearance: student.clearancePercentage
    });

    res.json({
      success: true,
      message: 'Items cleared successfully',
      clearancePercentage: student.clearancePercentage
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};