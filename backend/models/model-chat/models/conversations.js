module.exports = (sequelize, DataTypes) => {
    const Conversations = sequelize.define('Conversations', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        type: {
            type: DataTypes.ENUM('PRIVATE', 'GROUP'),
            allowNull: false
        },
        isSystemBlock: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        isAdminBlock: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        blockExpires: {
            type: DataTypes.DATE,
            allowNull: true
        },
        backgroundUrlId: {
            type: DataTypes.UUID,
            allowNull: true
        },
        joinCode: {
            type: DataTypes.STRING,
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
    Conversations.associate = models => {
        Conversations.hasMany(models.Participants, {
            foreignKey: 'conversationId',
            as: 'participants',
        });
        Conversations.hasMany(models.Messages, {
            foreignKey: 'conversationId',
            as: 'messages',
        });
        Conversations.hasMany(models.DeletedConversations, {
            foreignKey: 'conversationId',
            as: 'deletedConversations',
        });
    };
    return Conversations;
}