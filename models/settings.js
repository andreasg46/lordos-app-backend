const {DataTypes} = require('sequelize')
const db = require('../config/db')

const Settings = db.define('Settings', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    phaseA_time: {
        type: DataTypes.STRING,
    },
    phaseA_deadline: {
        type: DataTypes.STRING,
    },
    phaseB_time: {
        type: DataTypes.STRING,
    },
    phaseB_deadline: {
        type: DataTypes.STRING,
    },
    phaseC_time: {
        type: DataTypes.STRING,
    },
    phaseC_deadline: {
        type: DataTypes.STRING,
    },
    deadline: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    tableName: 'settings',
    timestamps: false
});

module.exports = Settings;