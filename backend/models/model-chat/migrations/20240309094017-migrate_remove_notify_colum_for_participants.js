'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Participants', 'muteNotifications');
    await queryInterface.removeColumn('Participants', 'muteNotificationsExpire');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('Participants', 'muteNotifications', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    });
    await queryInterface.addColumn('Participants', 'muteNotificationsExpire', {
      type: Sequelize.DATE,
      allowNull: true
    });
  }
};
