const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  payment_method: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'processing', 'completed', 'cancelled'),
    defaultValue: 'pending',
    allowNull: false
  },
  transaction_id: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'orders',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  paranoid: true,
  deletedAt: 'deleted_at'
});

// Make sure your Order model has these associations
Order.associate = (models) => {
  Order.belongsTo(models.User, {
    foreignKey: 'cid',
    as: 'user'
  });
  
  Order.belongsToMany(models.Product, {
    through: models.OrderProduct,
    foreignKey: 'order_id',
    otherKey: 'product_id',
    as: 'products'
  });
};
module.exports = Order;
