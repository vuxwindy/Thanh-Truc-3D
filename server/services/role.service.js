const db = require('../models');

const getAllRoles = async () => {
  return await db.Role.findAll();
};

const createRole = async (roleName) => {
  const existingRole = await db.Role.findOne({ where: { role_name: roleName } });
  if (existingRole) {
    throw new Error('Role already exists');
  }
  return await db.Role.create({ role_name: roleName });
};

const assignRoleToUser = async (userId, roleIds = []) => {
  console.log('roleIds:', roleIds);
  
  const user = await db.User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }

  // Validate roleIds
  if (!Array.isArray(roleIds)) {
    throw new Error('roleIds must be an array');
  }

  // Remove all existing roles
  await db.UserRole.destroy({
    where: { user_id: userId }
  });

  // Add new roles only if roleIds array is not empty
  if (roleIds.length > 0) {
    const rolePromises = roleIds.map(roleId => 
      db.UserRole.create({
        user_id: userId,
        role_id: roleId
      })
    );
    await Promise.all(rolePromises);
  }

  return { message: 'Roles updated successfully' };
};

module.exports = {
  getAllRoles,
  createRole,
  assignRoleToUser
};