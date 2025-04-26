'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('order_products', 'licence', {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'price'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('order_products', 'licence');
  }
};