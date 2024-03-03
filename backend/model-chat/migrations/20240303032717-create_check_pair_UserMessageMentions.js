'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('UserMessageMentions', {
      fields: ['userId', 'messageId'],
      type: 'unique',
      name: 'user_message_unique'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('UserMessageMentions', 'user_message_unique');
  }
};