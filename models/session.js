const {DataTypes} = require('sequelize')
const db = require('../config/db')

const User = require('./user');

const Session = db.define('Session', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    code: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: User,
            key: 'code'

        }
    },
    activated: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },

    start_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: true,
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