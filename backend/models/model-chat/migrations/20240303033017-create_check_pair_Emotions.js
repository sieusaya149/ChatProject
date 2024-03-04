'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Emotions', {
      fields: ['userId', 'messageId'],
      type: 'unique',
      name: 'emotion_user_message_unique'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Emotions', 'emotion_user_message_unique');
  }
};