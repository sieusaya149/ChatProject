'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add unique constraint to accountId
    await queryInterface.addConstraint('Users', {
      fields: ['accountId'],
      type: 'unique',
      name: 'unique_accountId'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove unique constraint from accountId
    await queryInterface.removeConstraint('Users', 'unique_accountId');
  }
};