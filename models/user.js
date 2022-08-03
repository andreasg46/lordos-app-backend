const {DataTypes} = require('sequelize')
const db = require('../config/db')

const Role = require('./role');

const User = db.define('User', {
    code: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    RoleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Role,
            key: 'id'

        }
    },
}, {
    tableName: 'users',
    timestamps: false
});

module.exports = User;