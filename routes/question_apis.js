const express = require('express');
const router = express.Router();
const {QueryTypes} = require("sequelize");
const db = require('../config/db');

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

router.get('/questions/:type/:phase', (req, res) => {
    const {type, phase} = req.params;

    Question.findAll({
        where: {
            type: type,
            phase: phase
        },
        order: [
            ['id', 'ASC']
        ]
    })
        .then(questions => {
            if (questions) {
                Question.count({
                    where: {
                        type: type,
                        phase: phase
                    }
                })
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
            } else {
                return res.status(404)
                    .setHeader('content-type', 'application/json')
                    .send({error: `Questions not found for type: ${type} and phase ${phase}!`});
            }
        })

        .catch(error => {
            return res.status(500)
                .setHeader('content-type', 'application/json')
                .send({error: `Server error: ${error.name}`});
        });
});

router.get('/questions/answered/:id/:code/:phase/:startDate/:endDate', async (req, res) => {
    const {id, code, phase, startDate, endDate} = req.params;

    if (!id || !code || !phase || !startDate || !endDate) {
        return res.status(400)
            .setHeader('content-type', 'application/json')
            .send({error: `Missing parameters - id,code,phase,startDate,endDate`});
    }


    {
        await db.query(`
                    SELECT DISTINCT u.code
                    FROM sessions s
                             INNER JOIN users u on u.code = s.code
                             INNER JOIN answers a on u.code = a."UserCode"
                             INNER JOIN questions q on a."QuestionId" = q.id
                    where u.code != :code
                      AND s.id = :id
                      AND q.phase = :phase
                      AND a."createdAt" BETWEEN :startDate AND :endDate
            `,
            {
                replacements: {code: code, id: id, phase: phase, startDate, endDate},
                type: QueryTypes.SELECT
            })
            .then(users => {
                return res.status(200)
                    .setHeader('content-type', 'application/json')
                    .send(users);
            })
            .catch(error => {
                return res.status(500)
                    .setHeader('content-type', 'application/json')
                    .send({error: `Server error: ${error.name}`});
            });
    }
})

router.get('/questions/user/answered/:id/:code/:phase/:startDate/:endDate', async (req, res) => {
    const {id, code, phase, startDate, endDate} = req.params;

    if (!id || !code || !phase || !startDate || !endDate) {
        return res.status(400)
            .setHeader('content-type', 'application/json')
            .send({error: `Missing parameters - id,code,phase,startDate,endDate`});
    }


    {
        await db.query(`
                    SELECT DISTINCT u.code
                    FROM sessions s
                             INNER JOIN users u on u.code = s.code
                             INNER JOIN answers a on u.code = a."UserCode"
                             INNER JOIN questions q on a."QuestionId" = q.id
                    where u.code = :code
                      AND s.id = :id
                      AND q.phase = :phase
                      AND a."createdAt" BETWEEN :startDate AND :endDate
            `,
            {
                replacements: {code: code, id: id, phase: phase, startDate, endDate},
                type: QueryTypes.SELECT
            })
            .then(users => {
                return res.status(200)
                    .setHeader('content-type', 'application/json')
                    .send(users);
            })
            .catch(error => {
                return res.status(500)
                    .setHeader('content-type', 'application/json')
                    .send({error: `Server error: ${error.name}`});
            });
    }
})

router.post('/question/create', async (req, res) => {
    const {title, options, correct_option, type, phase, deadline_min} = req.body;

    if (!title || !options || !correct_option || !type || !phase) {
        return res.status(400)
            .setHeader('content-type', 'application/json')
            .send({error: `Missing parameters - title,options,correct_option,type,phase`});
    }

    Question.create({
        title: title,
        options: options,
        correct_option: correct_option,
        type: type,
        phase: phase,
        deadline_min: deadline_min
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