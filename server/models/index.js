const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Load models
const User = require('./User')(sequelize);
const Role = require('./Role');
const UserRole = require('./UserRole');
const Product = require('./Product');
const Category = require('./Category');
const Banner = require('./Banner');
const Post = require('./Post');
const CartItem = require('./CartItem');
const Order = require('./Order');
const OrderProduct = require('./OrderProduct');
const Conversation = require('./conversation')(sequelize, Sequelize.DataTypes);
const Message = require('./message')(sequelize, Sequelize.DataTypes);
// Add models to db object
db.User = User;
db.Role = Role;
db.UserRole = UserRole;
db.Product = Product;
db.Category = Category;
db.Banner = Banner;
db.Post = Post;
db.CartItem = CartItem;
db.Order = Order;
db.OrderProduct = OrderProduct;
db.Conversation = Conversation;
db.Message = Message;
// Initialize associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Sync database
sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced successfully');
}).catch(err => {
  console.error('Error syncing database:', err);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;