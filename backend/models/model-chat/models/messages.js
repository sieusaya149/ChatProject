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
        status: {
            type: DataTypes.ENUM('SENDING', 'DELIVERED'),
            allowNull: false,
            defaultValue: 'SENDING'
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
        userId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        isUndo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        isPin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        pinAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        conversationId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: true
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

        Messages.hasMany(models.HideMessages, {
            foreignKey: 'messageId',
            as: 'hideMessage',
        });
    };
    return Messages;
}