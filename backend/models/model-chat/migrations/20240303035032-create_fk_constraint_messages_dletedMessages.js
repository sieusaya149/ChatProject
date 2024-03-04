'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('DeletedMessages', {
      fields: ['messageId'],
      type: 'foreign key',
      name: 'messageId_fkey',
      references: { //Required field
        table: 'Messages',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('DeletedMessages', 'messageId_fkey');
  }
};