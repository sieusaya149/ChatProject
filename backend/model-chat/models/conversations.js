module.exports = (sequelize, DataTypes) => {
    const Conversations = sequelize.define('Conversations', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
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
    Conversations.associate = models => {
        Conversations.hasMany(models.Conversations, {
            foreignKey: 'conversationId',
            as: 'participants',
        });
    };

    Conversations.associate = models => {
        Conversations.hasMany(models.Messages, {
            foreignKey: 'conversationId',
            as: 'messages',
        });
    };

    Conversations.associate = models => {
        Conversations.hasMany(models.DeletedConversations, {
            foreignKey: 'conversationId',
            as: 'deletedConversations',
        });
    };
}