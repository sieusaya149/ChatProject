'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('HideMessages', {
      fields: ['userId', 'messageId'],
      type: 'unique',
      name: 'unique_userId_messageId_hideMessages'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('HideMessages', 'unique_userId_messageId_hideMessages');
  }
};