const { createRole, assignRoleToUser, getAllRoles } = require('../services/role.service');

const getRolesHandler = async (req, res) => {
  try {
    const roles = await getAllRoles();
    res.json(roles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createRoleHandler = async (req, res) => {
  try {
    const { role_name } = req.body;
    const result = await createRole(role_name);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const assignRoleHandler = async (req, res) => {
  try {
    const { userId, roleIds } = req.body;
    const result = await assignRoleToUser(userId, roleIds);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getRolesHandler,
  createRoleHandler,
  assignRoleHandler
};