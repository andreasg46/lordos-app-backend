const express = require('express');
const router = express.Router();
const db = require('../config/db');
const {Op} = require("sequelize");

const Question = require('../models/question');

router.get('/questions', (req, res) => {
    Question.findAll()
        .then(questions => {
            Question.count()
                .then(count => {
                    return res.status(200)
                        .setHeader('content-type', 'application/json')
                        .send({questions, count});
                })
                .catch(error => {
                    return res.status(500)
                        .setHeader('content-type', 'application/json')
                        .send({error: `Server error: ${error.name}`});
                });
        })
        .catch(error => {
            return res.status(500)
                .setHeader('content-type', 'application/json')
                .send({error: `Server error: ${error.name}`});
        });
});

router.post('/question/create', async (req, res) => {
    const {title, options, correct_option} = req.body;

    if (!title || !options || !correct_option) {
        return res.status(400)
            .setHeader('content-type', 'application/json')
            .send({error: `Missing parameters - title,options,correct_option`});
    }

    Question.create({
        title: title,
        options: options,
        correct_option: correct_option
    })
        .then(question => {
            return res.status(200)
                .setHeader('content-type', 'application/json')
                .send({message: `Question added!`, question: question});
        })
        .catch(error => {
            return res.status(500)
                .setHeader('content-type', 'application/json')
                .send({error: `Server error: ${error.name}`});
        });
});

module.exports = router;