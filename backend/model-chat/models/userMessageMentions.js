module.exports = (sequelize, DataTypes) => {
    const UserMessageMentions = sequelize.define('UserMessageMentions', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        messageId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        userId: {
          type: Sequelize.UUID,
          allowNull: false
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        }
    });
    UserMessageMentions.associate = models => {
        UserMessageMentions.belongsTo(models.Messages, {
            foreignKey: 'messageId',
            as: 'messageMention',
        });
    };
}