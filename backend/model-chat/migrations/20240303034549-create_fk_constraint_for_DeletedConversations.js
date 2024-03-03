'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('DeletedConversations', {
      fields: ['conversationId'],
      type: 'foreign key',
      name: 'conversationId_fkey',
      references: { //Required field
        table: 'Conversations',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('DeletedConversations', 'conversationId_fkey');
  }
};