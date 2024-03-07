'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION update_blockexpires()
      RETURNS TRIGGER AS $$
      BEGIN
        IF NEW."isAdminBlock" = false AND NEW."isSystemBlock" = false THEN
          NEW."blockExpires" = NULL;
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER update_blockexpires_trigger
      BEFORE INSERT OR UPDATE ON "Conversations"
      FOR EACH ROW
      EXECUTE FUNCTION update_blockexpires();
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      DROP TRIGGER update_blockexpires_trigger ON "Conversations";
      DROP FUNCTION update_blockexpires;
    `);
  }
};
