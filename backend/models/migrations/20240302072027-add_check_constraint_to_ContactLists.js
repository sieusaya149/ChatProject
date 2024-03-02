'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('ContactLists', {
      fields: ['userId', 'contactId'],
      type: 'check',
      where: {
        userId: {
          [Sequelize.Op.ne]: Sequelize.literal('"contactId"')
        }
      },
      name: 'userId_contactId_check'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('ContactLists', 'userId_contactId_check');
  }
};