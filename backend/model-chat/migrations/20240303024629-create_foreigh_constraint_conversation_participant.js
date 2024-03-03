'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Participants', {
      fields: ['conversationId'],
      type: 'foreign key',
      name: 'fk_conversationId',
      references: {
        table: 'Conversations',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Participants', 'fk_conversationId');
  }
};