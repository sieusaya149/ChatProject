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
          type: DataTypes.UUID,
          allowNull: false
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW
        }
    });
    UserMessageMentions.associate = models => {
        UserMessageMentions.belongsTo(models.Messages, {
            foreignKey: 'messageId',
            as: 'messageMention',
        });
    };
    return UserMessageMentions;
}