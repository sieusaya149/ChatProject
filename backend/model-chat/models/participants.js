module.exports = (sequelize, DataTypes) => {
    const Participants = sequelize.define('Participants', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        isCreator: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        isAdmin: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        joinedDate: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        },
        nickName: {
          type: Sequelize.STRING,
          allowNull: true
        },
        lastViewedMessage: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        accessConversationKey: {
          type: Sequelize.STRING,
          allowNull: false
        },
        isBlocked: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        blockExpires: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: null
        },
        userId: {
          type: Sequelize.UUID,
          allowNull: false
        },
        conversationId: {
          type: Sequelize.UUID,
          allowNull: false
        },
        muteNotifications: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        muteNotificationsExpire: {
          type: Sequelize.DATE,
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
    Participants.associate = models => {
        Participants.belongsTo(models.Conversations, {
            foreignKey: 'conversationId',
            as: 'conversation',
        });
    };
}