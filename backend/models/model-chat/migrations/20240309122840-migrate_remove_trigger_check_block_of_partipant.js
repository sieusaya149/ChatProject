'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.sequelize.query(`
      DROP TRIGGER update_block_expires_and_mute_notifications_expire ON "Participants";
      DROP FUNCTION update_block_expires_and_mute_notifications_expire();
    `);
  },
 
  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION update_block_expires_and_mute_notifications_expire() RETURNS TRIGGER AS $$
      BEGIN
        IF NEW.isBlocked = false THEN
          NEW.blockExpires = null;
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER update_block_expires_and_mute_notifications_expire
      BEFORE UPDATE ON "Participants"
      FOR EACH ROW EXECUTE PROCEDURE update_block_expires_and_mute_notifications_expire();
    `);
  }
};