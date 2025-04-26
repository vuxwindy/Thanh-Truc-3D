'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {
        name: 'Game Mobile',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Game Web',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Blocktrain',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', {
      name: ['Game Mobile', 'Game Web', 'Blocktrain']
    }, {});
  }
};