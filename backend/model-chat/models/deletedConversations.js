module.exports = (sequelize, DataTypes) => {
    const DeletedConversations = sequelize.define('DeletedConversations', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        conversationId: {
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
    DeletedConversations.associate = models => {
        DeletedConversations.belongsTo(models.Conversations, {
            foreignKey: 'conversationId',
            as: 'deletedConversation',
        });
    };
}