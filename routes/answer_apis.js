const express = require('express');
const router = express.Router();
const db = require('../config/db');
const {Op} = require("sequelize");

const Answer = require('../models/answer');

router.get('/answers', (req, res) => {
    Answer.findAll()
        .then(answers => {
            return res.status(200)
                .setHeader('content-type', 'application/json')
                .send(answers);
        })
        .catch(error => {
            return res.status(500)
                .setHeader('content-type', 'application/json')
                .send({error: `Server error: ${error.name}`});
        });
});

router.post('/answer/create', async (req, res) => {
    const {selected, UserCode, QuestionId} = req.body;

    const TODAY_START = new Date().setHours(0, 0, 0, 0);
    const NOW = new Date().setHours(23, 59, 59);

    console.log(TODAY_START);
    console.log(NOW);
    if (!selected || !UserCode || !QuestionId) {
        return res.status(400)
            .setHeader('content-type', 'application/json')
            .send({error: `Missing parameters - id,selected,UserCode,QuestionId`});
    }

    return db.transaction(async (t) => {

        const answer = await Answer.findOne({
            where: {
                QuestionId: QuestionId,
                UserCode: UserCode,
                createdAt: {
                    [Op.gt]: TODAY_START,
                    [Op.lt]: NOW
                }
            }});

        if (answer) {
            if (selected)
                answer.selected = selected;

            return answer.save({transaction: t})
                .then(answer => {
                    res.status(200)
                        .setHeader('content-type', 'application/json')
                        .send({message: `Answer updated!`, answer: answer});
                })
                .catch(error => {
                    res.status(500)
                        .setHeader('content-type', 'application/json')
                        .send({error: `Server error: ${error.name}`});
                });
        } else {
            Answer.create({
                selected: selected,
                UserCode: UserCode,
                QuestionId: QuestionId
            })
                .then(answer => {
                    return res.status(200)
                        .setHeader('content-type', 'application/json')
                        .send({message: `Answer added!`, answer: answer});
                })
                .catch(error => {
                    return res.status(500)
                        .setHeader('content-type', 'application/json')
                        .send({error: `Server error: ${error.name}`});
                });

        }
    })


});

module.exports = router;