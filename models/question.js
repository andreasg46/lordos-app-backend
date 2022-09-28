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
    type: {
        type: DataTypes.ENUM('parent', 'child'),
        allowNull: false
    },
    response: {
        type: DataTypes.ENUM('single', 'multiple'),
        allowNull: false,
        defaultValue: 'multiple'
    },
    phase: {
        type: DataTypes.ENUM('A', 'B', 'C'),
        allowNull: false
    },
    deadline_min: {
        type: DataTypes.INTEGER,
        defaultValue: 30
    },
}, {
    tableName: 'questions',
    timestamps: false
});

module.exports = Question;