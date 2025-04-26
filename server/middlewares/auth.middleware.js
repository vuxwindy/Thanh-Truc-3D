const { JWT_SECRET, verifyToken } = require('../config/jwt');
const db = require('../models');
const { ADMIN_ROLE_NAME, CUSTOMER_ROLE_NAME } = require('../constant');

const adminAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Check if token matches TOKEN_TO_SEVER
    if (token === process.env.TOKEN_TO_SEVER) {
      return next();
    }

    const decoded = verifyToken(token, JWT_SECRET);

    const user = await db.User.findOne({
      where: { id: decoded.id },
      include: [{
        model: db.Role,
        as: 'roles',
        through: { attributes: [] }
      }]
    });

    if (!user || !user.roles.some(role => role.role_name === ADMIN_ROLE_NAME)) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Check if authMiddleware is exported correctly
// It should be a function, not an object with a function property

// If your middleware is defined like this:
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    // Check if token matches TOKEN_TO_SEVER
    if (token === process.env.TOKEN_TO_SEVER) {
      return next();
    }

    const decoded = verifyToken(token, JWT_SECRET);
    
    const user = await db.User.findOne({
      where: { id: decoded.id },
      include: [{
        model: db.Role,
        as: 'roles',
        through: { attributes: [] }
      }]
    });
    if (user || user.roles.some(role => role.role_name === ADMIN_ROLE_NAME)) {
      req.user = user;
      next();
      return;
    }

    if (!user || !user.roles.some(role => role.role_name === CUSTOMER_ROLE_NAME)) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = {
  adminAuthMiddleware,
  authMiddleware
};