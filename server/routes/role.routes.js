const express = require('express');
const router = express.Router();
const { createRoleHandler, assignRoleHandler, getRolesHandler } = require('../controllers/role.controller');
const { adminAuthMiddleware } = require('../middlewares/auth.middleware');

router.get('/', adminAuthMiddleware, getRolesHandler);
router.post('/create', adminAuthMiddleware, createRoleHandler);
router.post('/assign', adminAuthMiddleware, assignRoleHandler);

module.exports = router;