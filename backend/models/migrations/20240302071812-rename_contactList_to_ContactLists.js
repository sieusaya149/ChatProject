'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('ContactList', 'ContactLists');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('ContactLists', 'ContactList');
  }
};