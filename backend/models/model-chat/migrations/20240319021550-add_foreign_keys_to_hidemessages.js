'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('HideMessages', {
      fields: ['messageId'],
      type: 'foreign key',
      name: 'fk_messageId_hideMessages',
      references: { //Required field
        table: 'Messages',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('HideMessages', 'fk_messageId_hideMessages');
  }
};