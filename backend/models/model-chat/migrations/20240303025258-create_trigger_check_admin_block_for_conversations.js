'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION update_block_expires() RETURNS TRIGGER AS $$
      BEGIN
        IF NEW."isAdminBlock" = false THEN
          NEW."blockExpires" = null;
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER update_block_expires
      BEFORE UPDATE ON "Conversations"
      FOR EACH ROW EXECUTE PROCEDURE update_block_expires();
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      DROP TRIGGER update_block_expires ON "Conversations";
      DROP FUNCTION update_block_expires();
    `);
  }
};