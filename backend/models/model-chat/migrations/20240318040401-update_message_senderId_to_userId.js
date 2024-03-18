'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // change name colum senderId to userId
    await queryInterface.renameColumn('Messages', 'senderId', 'userId');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Messages', 'userId', 'senderId');
  }
};
