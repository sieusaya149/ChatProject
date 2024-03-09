'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('ConversationSettings', 'isMuteNotiMessage', {
      type: Sequelize.JSON,
      allowNull: true,
    });
    await queryInterface.changeColumn('ConversationSettings', 'isMuteNotiMention', {
      type: Sequelize.JSON,
      allowNull: true,
    });
    await queryInterface.changeColumn('ConversationSettings', 'isMuteNotiJoinGroup', {
      type: Sequelize.JSON,
      allowNull: true,
    });
    await queryInterface.changeColumn('ConversationSettings', 'isMuteNotiLeaveGroup', {
      type: Sequelize.JSON,
      allowNull: true,
    });
    await queryInterface.changeColumn('ConversationSettings', 'pinMessage', {
      type: Sequelize.JSON,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('ConversationSettings', 'isMuteNotiMessage', {
      type: Sequelize.JSON,
      allowNull: false,
    });
    await queryInterface.changeColumn('ConversationSettings', 'isMuteNotiMention', {
      type: Sequelize.JSON,
      allowNull: false,
    });
    await queryInterface.changeColumn('ConversationSettings', 'isMuteNotiJoinGroup', {
      type: Sequelize.JSON,
      allowNull: false,
    });
    await queryInterface.changeColumn('ConversationSettings', 'isMuteNotiLeaveGroup', {
      type: Sequelize.JSON,
      allowNull: false,
    });
    await queryInterface.changeColumn('ConversationSettings', 'pinMessage', {
      type: Sequelize.JSON,
      allowNull: false,
    });
  }
};
