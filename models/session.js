const {DataTypes} = require('sequelize')
const db = require('../config/db')

const Session = db.define('Session', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    users: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
}, {
    tableName: 'sessions',
    timestamps: false
});

module.exports = Session;