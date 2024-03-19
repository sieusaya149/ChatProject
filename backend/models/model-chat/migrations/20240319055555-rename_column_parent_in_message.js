'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Messages', 'parent', 'replyTo');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Messages', 'replyTo', 'parent');
  }
};