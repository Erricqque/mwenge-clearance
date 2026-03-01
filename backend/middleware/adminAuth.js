const Admin = require('../models/Admin');

exports.isAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin || admin.role === 'viewer') {
      return res.status(403).json({ message: 'Access denied' });
    }
    req.user.role = admin.role;
    req.user.name = admin.name;
    req.user.permissions = admin.permissions;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.hasPermission = (permission) => {
  return (req, res, next) => {
    if (!req.user.permissions.includes(permission)) {
      return res.status(403).json({ message: 'Permission denied' });
    }
    next();
  };
};