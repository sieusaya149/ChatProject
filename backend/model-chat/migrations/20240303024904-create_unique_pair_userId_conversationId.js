'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Participants', {
      fields: ['userId', 'conversationId'],
      type: 'unique',
      name: 'unique_participation'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Participants', 'unique_participation');
  }
};