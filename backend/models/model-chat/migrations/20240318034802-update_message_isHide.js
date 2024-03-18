'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // change name colum isHide to isUndo
    await queryInterface.renameColumn('Messages', 'isHide', 'isUndo');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Messages', 'isUndo', 'isHide');
  }
};
