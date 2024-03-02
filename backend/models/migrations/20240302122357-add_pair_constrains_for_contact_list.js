'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add unique constraint to pair of userId and contactId
    await queryInterface.addConstraint('ContactLists', {
      fields: ['userId', 'contactId'],
      type: 'unique',
      name: 'unique_userId_contactId'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove unique constraint from pair of userId and contactId
    await queryInterface.removeConstraint('ContactLists', 'unique_userId_contactId');
  }
};