const {DataTypes} = require('sequelize')
const db = require('../config/db')

const Role = require('./role');

const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
}, {
    tableName: 'users',
    timestamps: true
});

User.belongsTo(Role, {
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
});

module.exports = User;