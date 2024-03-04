module.exports = (sequelize, DataTypes) => {
    const DeletedConversations = sequelize.define('DeletedConversations', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        conversationId: {
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
    DeletedConversations.associate = models => {
        DeletedConversations.belongsTo(models.Conversations, {
            foreignKey: 'conversationId',
            as: 'deletedConversation',
        });
    };
    return DeletedConversations;
}