const {DataTypes} = require('sequelize')
const db = require('../config/db')

const User = require('./user');

const Session = db.define('Session', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    parent_1: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: User,
            key: 'code'
        }
    },
    parent_2: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: User,
            key: 'code'
        }
    },
    child: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: User,
            key: 'code'
        }
    },
    status: {
        type: DataTypes.ENUM('Active', 'Inactive', 'Pending'),
        defaultValue: 'Inactive'
    }
}, {
    tableName: 'sessions',
    timestamps: false
});

module.exports = Session;