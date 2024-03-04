'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Participants', 'accessConversationKey');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('Participants', 'accessConversationKey', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};
