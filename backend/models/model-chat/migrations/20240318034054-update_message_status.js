'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // add columm status for messages
    await queryInterface.addColumn('Messages', 'status', {
      type: Sequelize.ENUM('SENDING', 'DELIVERED'),
      allowNull: false,
      defaultValue: 'SENDING'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Messages', 'status');
  }
};