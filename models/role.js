const {DataTypes} = require('sequelize')
const db = require('../config/db')

const Role = db.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
}, {
    tableName: 'roles',
    timestamps: false
});

module.exports = Role;