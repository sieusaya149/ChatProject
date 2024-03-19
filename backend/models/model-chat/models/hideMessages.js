module.exports = (sequelize, DataTypes) => {
    const HideMessages = sequelize.define('HideMessages', {
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
        remainTime:{
            type: DataTypes.DATE,
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
    HideMessages.associate = models => {
        HideMessages.belongsTo(models.Messages, {
            foreignKey: 'messageId',
            as: 'hideMessage',
        });
        // TODO COMMENT BECAUSE NEED HELP FROM USER SERVICE
        // HideMessages.belongsTo(models.Users, {
        //     foreignKey: 'userId',
        //     as: 'userHideMessage',
        // });
    };
    return HideMessages;
}