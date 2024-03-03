module.exports = (sequelize, DataTypes) => {
    const Messages = sequelize.define('Messages', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        type: {
            type: DataTypes.ENUM('FILE', 'TEXT', 'STICKER'),
            allowNull: false
        },
        messageIndex: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
        parent: {
            type: DataTypes.UUID,
            allowNull: true
        },
        isForwarded: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        senderId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        isHide: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        conversationId: {
            type: DataTypes.UUID,
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
    Messages.associate = models => {
        Messages.belongsTo(models.Conversations, {
            foreignKey: 'conversationId',
            as: 'belongConversation',
        });

        Messages.hasMany(models.UserMessageMentions, {
            foreignKey: 'messageId',
            as: 'mention',
        });

        Messages.hasMany(models.Emotions, {
            foreignKey: 'messageId',
            as: 'emotion',
        });

        Messages.hasMany(models.DeletedMessages, {
            foreignKey: 'messageId',
            as: 'deletedMessage',
        });
    };
}