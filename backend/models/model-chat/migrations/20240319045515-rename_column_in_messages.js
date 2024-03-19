'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Participants', 'lastViewedMessage', 'lastestViewedMessageIndex');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Participants', 'lastestViewedMessageIndex', 'lastViewedMessage');
  }
};