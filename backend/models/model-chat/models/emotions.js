module.exports = (sequelize, DataTypes) => {
    const Emotions = sequelize.define('Emotions', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url: {
          type: DataTypes.STRING,
          allowNull: false
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        messageId: {
            type: DataTypes.UUID,
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
    Emotions.associate = models => {
        Emotions.belongsTo(models.Messages, {
            foreignKey: 'messageId',
            as: 'messageEmotion',
        });
    };
    return Emotions;
}