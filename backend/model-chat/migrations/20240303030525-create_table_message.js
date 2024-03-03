'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Messages', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      type: {
        type: Sequelize.ENUM('FILE', 'TEXT', 'STICKER'),
        allowNull: false
      },
      messageIndex: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      parent: {
        type: Sequelize.UUID,
        allowNull: true
      },
      isForwarded: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      senderId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      isHide: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      conversationId: {
        type: Sequelize.UUID,
        allowNull: false
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
    await queryInterface.dropTable('Messages');
  }
};