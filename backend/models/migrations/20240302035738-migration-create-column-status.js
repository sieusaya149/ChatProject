'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'status', {
      type: Sequelize.ENUM('ACTIVE', 'INACTIVE'),
      allowNull: false,
      defaultValue: 'ACTIVE',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'status');
  }
};
