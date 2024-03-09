module.exports = (sequelize, DataTypes) => {
    const ConversationSettings = sequelize.define('ConversationSettings', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        isMuteNotiMessage: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        isMuteNotiMention: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        isMuteNotiJoinGroup: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        isMuteNotiLeaveGroup: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        isAdminSetting: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        addByAll: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        pinMessage: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        isFavorite: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
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
    ConversationSettings.associate = models => {
        ConversationSettings.hasOne(models.Participants, {
            foreignKey: 'conversationSettingId',
            as: 'conversationSettings',
        });
    };
    return ConversationSettings;
}