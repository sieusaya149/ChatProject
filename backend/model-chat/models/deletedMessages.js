module.exports = (sequelize, DataTypes) => {
    const DeletedMessages = sequelize.define('DeletedMessages', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        messageId: {
          type: Sequelize.UUID,
          allowNull: false
        },
        remainingTime:{
            type: Sequelize.DATE,
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
    DeletedMessages.associate = models => {
        DeletedMessages.belongsTo(models.Messages, {
            foreignKey: 'messageId',
            as: 'deletedMessage',
        });
    };
}