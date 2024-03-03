import { v4 as uuidv4 } from 'uuid';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('Users', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        sex: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        birthDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        bio: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        avatar:{
            type: DataTypes.UUID,
            allowNull: true,
        },
        accountId:{
            type: DataTypes.UUID,
            allowNull: false,
            unique: true,
        },
        regionPhoneCodeId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('ACTIVE', 'INACTIVE'),
            allowNull: false,
            defaultValue: 'ACTIVE',
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
    User.associate = models => {
        User.hasOne(models.RegionPhoneCodes, {
            foreignKey: 'regionPhoneCodeId',
            as: 'regionPhoneCode',
        });
    };
    return User;
}
