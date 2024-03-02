'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Users', {
      fields: ['regionPhoneCodeId'],
      type: 'foreign key',
      name: 'users_regionphonecode_fkey',
      references: {
        table: 'RegionPhoneCodes',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Users', 'users_regionphonecode_fkey');
  }
};
