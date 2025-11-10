const db = require('../models');

const listPendingUsers = async (req, res) => {
  try {
    const users = await db.User.findAll({
      where: { idStatus: 'pending' },
      attributes: ['id', 'email', 'fullName', 'phone', 'idFrontImage', 'idBackImage', 'created_at']
    });
    res.json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const approveUser = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.idStatus = 'approved';
    await user.save();
    res.json({ message: 'User approved' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const rejectUser = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.idStatus = 'rejected';
    await user.save();
    res.json({ message: 'User rejected' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  listPendingUsers,
  approveUser,
  rejectUser
};
