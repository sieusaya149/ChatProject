module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Conversations', 'name', {
      type: Sequelize.STRING,
      allowNull: true
    });

    // trigger check name should be null if type of conversation is PRIVATE
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION check_name_null_for_private_conversation() RETURNS TRIGGER AS $$
      BEGIN
        IF NEW.type = 'PRIVATE' AND NEW.name IS NOT NULL THEN
          RAISE EXCEPTION 'Name should be null for private conversations';
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER check_name_null_for_private_conversation
      BEFORE UPDATE ON "Conversations"
      FOR EACH ROW EXECUTE PROCEDURE check_name_null_for_private_conversation();
    `);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Conversations', 'name');

    await queryInterface.sequelize.query(`
      DROP TRIGGER check_name_null_for_private_conversation ON "Conversations";
      DROP FUNCTION check_name_null_for_private_conversation();
    `);
  }
};