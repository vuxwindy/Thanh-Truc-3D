const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Middleware xác thực người dùng thông thường
const authenticate = async (req, res, next) => {
  try {
    // Lấy token từ header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        message: 'Không có token xác thực' 
      });
    }
    
    const token = authHeader.split(' ')[1];
    
    // Xác thực token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Tìm user từ database
    const user = await User.findByPk(decoded.userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'Không tìm thấy người dùng' 
      });
    }
    
    // Lưu thông tin user vào request
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Token đã hết hạn' 
      });
    }
    
    return res.status(401).json({ 
      success: false, 
      message: 'Xác thực không thành công',
      error: error.message
    });
  }
};

// Middleware xác thực admin
const authenticateAdmin = async (req, res, next) => {
  try {
    await authenticate(req, res, () => {
      // Kiểm tra vai trò admin
      if (req.user && req.user.role === 'admin') {
        next();
      } else {
        return res.status(403).json({ 
          success: false, 
          message: 'Không có quyền truy cập. Cần quyền Admin.'
        });
      }
    });
  } catch (error) {
    console.error('Admin auth error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Lỗi máy chủ',
      error: error.message
    });
  }
};

// Middleware tùy chọn xác thực (cho phép request không có token)
const optionalAuthenticate = async (req, res, next) => {
  try {
    // Lấy token từ header (nếu có)
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // Nếu không có token, chuyển đến route handler mà không set req.user
      return next();
    }
    
    const token = authHeader.split(' ')[1];
    
    // Xác thực token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Tìm user từ database
    const user = await User.findByPk(decoded.userId);
    
    if (user) {
      // Nếu tìm thấy user, set req.user
      req.user = user;
    }
    
    next();
  } catch (error) {
    // Nếu token không hợp lệ, vẫn cho phép request đi tiếp mà không set req.user
    next();
  }
};

module.exports = {
  authenticate,
  authenticateAdmin,
  optionalAuthenticate
}; 