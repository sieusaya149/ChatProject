import { v4 as uuidv4 } from 'uuid';

module.exports = (sequelize, DataTypes) => {
    const ContactList = sequelize.define('ContactLists', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        contactId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        block: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        blockExpires: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    });
    ContactList.associate = models => {
        ContactList.belongsTo(models.Users, {
            foreignKey: 'userId',
            as: 'user',
        });
    };
    ContactList.associate = models => {
        ContactList.belongsTo(models.Users, {
            foreignKey: 'contactId',
            as: 'contact',
        });
    };
    return ContactList
}