'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('ContactList', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'contactlist_userid_fkey',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    // Add foreign key constraint for contactId
    await queryInterface.addConstraint('ContactList', {
      fields: ['contactId'],
      type: 'foreign key',
      name: 'contactlist_contactid_fkey',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('ContactList', 'contactlist_userid_fkey');
    await queryInterface.removeConstraint('ContactList', 'contactlist_contactid_fkey');
  }
};
