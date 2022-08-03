const {DataTypes} = require('sequelize')
const db = require('../config/db')

const Question = db.define('Question', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
    },
    options: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
    correct_option: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'questions',
    timestamps: false
});

module.exports = Question;