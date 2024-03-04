module.exports = (sequelize, DataTypes) => {
    const DeletedMessages = sequelize.define('DeletedMessages', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        messageId: {
          type: DataTypes.UUID,
          allowNull: false
        },
        remainingTime:{
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
    DeletedMessages.associate = models => {
        DeletedMessages.belongsTo(models.Messages, {
            foreignKey: 'messageId',
            as: 'deletedMessage',
        });
    };
    return DeletedMessages;
}