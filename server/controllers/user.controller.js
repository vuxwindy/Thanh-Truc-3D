const { 
  getAllUsers, 
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser,
  changePassword
} = require('../services/user.service');
const path = require('path');
const fs = require('fs');

const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';

    const result = await getAllUsers(page, limit, search);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createNewUser = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const files = req.files || {};
    let avatarPath = null;
    let passportPath = null;

    // Xử lý avatar
    if (files.avatar && files.avatar[0]) {
      const avatarFile = files.avatar[0];
      const avatarDir = path.join(__dirname, '../uploads/avatar');
      if (!fs.existsSync(avatarDir)) {
        fs.mkdirSync(avatarDir, { recursive: true });
      }
      const avatarFileName = `${req.params.id}-${Date.now()}${path.extname(avatarFile.originalname)}`;
      avatarPath = path.join('avatar', avatarFileName);
      fs.writeFileSync(path.join(avatarDir, avatarFileName), avatarFile.buffer);
    }

    // Xử lý passportImage
    if (files.passportImage && files.passportImage[0]) {
      const passportFile = files.passportImage[0];
      const passportDir = path.join(__dirname, '../uploads/passport');
      if (!fs.existsSync(passportDir)) {
        fs.mkdirSync(passportDir, { recursive: true });
      }
      const passportFileName = `${req.params.id}-${Date.now()}${path.extname(passportFile.originalname)}`;
      passportPath = path.join('passport', passportFileName);
      fs.writeFileSync(path.join(passportDir, passportFileName), passportFile.buffer);
    }

    const updatedUser = await updateUser(req.params.id, {
      ...req.body,
      ...(avatarPath && { avatar: avatarPath }),
      ...(passportPath && { passportImage: passportPath }),
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const deleteUserById = async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const changePasswordHandler = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const userId = req.params.id;
    
    const result = await changePassword(userId, { newPassword });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add to exports
module.exports = {
  getUsers,
  getUser,
  createNewUser,
  updateUserProfile,
  deleteUserById,
  changePasswordHandler
};