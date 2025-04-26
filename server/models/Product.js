const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  link: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  is_hot: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  is_new: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  priceSale: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  priceOrigin: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categories',
      key: 'id'
    }
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'products',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  paranoid: true,
  deletedAt: 'deleted_at'
});

// Add associations
Product.associate = (models) => {
  Product.belongsTo(models.Category, {
    foreignKey: 'category_id',
    as: 'category'
  });
};

module.exports = Product;