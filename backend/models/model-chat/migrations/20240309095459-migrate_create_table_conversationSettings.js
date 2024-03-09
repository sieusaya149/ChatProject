'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ConversationSettings', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      isMuteNotiMessage: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: null
      },
      isMuteNotiMention: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: null
      },
      isMuteNotiJoinGroup: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: null
      },
      isMuteNotiLeaveGroup: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: null
      },
      isAdminSetting: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      addByAll: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      pinMessage: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: null
      },
      isFavorite: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ConversationSettings');
  }
};