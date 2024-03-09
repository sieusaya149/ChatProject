'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Participants', 'conversationSettingId', {
      type: Sequelize.UUID,
      allowNull: false
    });

    await queryInterface.addConstraint('Participants', {
      fields: ['conversationSettingId'],
      type: 'foreign key',
      name: 'fk_conversationSettingId',
      references: {
        table: 'ConversationSettings',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Participants', 'fk_conversationSettingId');
    await queryInterface.removeColumn('Participants', 'conversationSettingId');
  }
};