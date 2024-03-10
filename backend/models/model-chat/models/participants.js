module.exports = (sequelize, DataTypes) => {
    const Participants = sequelize.define('Participants', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        isCreator: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        isAdmin: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        joinedDate: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW
        },
        nickName: {
          type: DataTypes.STRING,
          allowNull: true
        },
        lastViewedMessage: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        isBlocked: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        },
        blockExpires: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: null
        },
        userId: {
          type: DataTypes.UUID,
          allowNull: false
        },
        conversationId: {
          type: DataTypes.UUID,
          allowNull: false
        },
        conversationSettingId: {
          type: DataTypes.UUID,
          allowNull: false
        },
        viewFromDate: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: null
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
    Participants.associate = models => {
        Participants.belongsTo(models.Conversations, {
            foreignKey: 'conversationId',
            as: 'conversation',
        });
        Participants.belongsTo(models.ConversationSettings, {
          foreignKey: 'conversationSettingId',
          as: 'conversationSetting',
        });
    };
    return Participants;
}