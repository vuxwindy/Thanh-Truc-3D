'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'idFrontImage', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'idBackImage', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'idStatus', {
      type: Sequelize.ENUM('pending', 'approved', 'rejected'),
      allowNull: false,
      defaultValue: 'pending'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'idFrontImage');
    await queryInterface.removeColumn('users', 'idBackImage');
    await queryInterface.removeColumn('users', 'idStatus');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_users_idStatus";');
  }
};
