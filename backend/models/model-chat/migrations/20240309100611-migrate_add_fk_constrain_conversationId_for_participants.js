'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Participants', {
      fields: ['conversationId'],
      type: 'foreign key',
      name: 'fk_conversationId_participants',
      references: {
        table: 'Conversations',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Participants', 'fk_conversationId_participants');
  }
};
