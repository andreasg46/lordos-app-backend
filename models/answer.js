const {DataTypes} = require('sequelize')
const db = require('../config/db')
const User = require("./user");
const Question= require("./question");

const Answer = db.define('Answer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    selected: {
        type: DataTypes.STRING,
        allowNull: true
    },
    UserCode: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: User,
            key: 'code'

        }
    },
    QuestionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Question,
            key: 'id'

        }
    },
}, {
    tableName: 'answers',
    timestamps: true
});

module.exports = Answer;