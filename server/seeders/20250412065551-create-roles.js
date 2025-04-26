'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        role_name: 'admin',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        role_name: 'customer',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', {
      role_name: ['admin', 'customer']
    }, {});
  }
};