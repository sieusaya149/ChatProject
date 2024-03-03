module.exports = (sequelize, DataTypes) => {
    const Emotions = sequelize.define('Emotions', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.String,
            allowNull: false
        },
        url: {
          type: Sequelize.String,
          allowNull: false
        },
        userId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        messageId: {
            type: Sequelize.UUID,
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
    Emotions.associate = models => {
        Emotions.belongsTo(models.Messages, {
            foreignKey: 'messageId',
            as: 'messageEmotion',
        });
    };
}