const express = require('express');
const router = express.Router();

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

    if (!selected || !UserCode || !QuestionId) {
        return res.status(400)
            .setHeader('content-type', 'application/json')
            .send({error: `Missing parameters - selected,UserCode,QuestionId`});
    }

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
});

module.exports = router;