const express = require('express');
const router = express.Router();
const { Op } = require("sequelize");
const Session = require('../models/session');

router.get('/sessions', (req, res) => {
    Session.findAll()
        .then(sessions => {
            return res.status(200)
                .setHeader('content-type', 'application/json')
                .send(sessions);
        })
        .catch(error => {
            return res.status(500)
                .setHeader('content-type', 'application/json')
                .send({error: `Server error: ${error.name}`});
        });
});

router.get('/session/user/:code', (req, res) => {
    const {code} = req.params;

    Session.findOne({where: {[Op.or]:[{parent_1 : code}, {parent_2: code}, {child: code}]}})
        .then(session => {
            if(session) {
                return res.status(200)
                    .setHeader('content-type', 'application/json')
                    .send(session);
            } else {
                return res.status(404)
                    .setHeader('content-type', 'application/json')
                    .send({error: `Session not found for session code: ${code}!`});
            }
        })
        .catch(error => {
            return res.status(500)
                .setHeader('content-type', 'application/json')
                .send({error: `Server error: ${error.name}`});
        });
});

router.post('/session/create', async (req, res) => {
    const {parent_1, parent_2, child} = req.body;

    if(!parent_1 && !parent_2 && !child) {
        return res.status(400)
            .setHeader('content-type', 'application/json')
            .send({error: `Missing parameters - parent_1, parent_2, child`});
    }

    Session.create({
        parent_1: parent_1 || null,
        parent_2: parent_2 || null,
        child: child || null,
    })
        .then(user => {
            return res.status(200)
                .setHeader('content-type', 'application/json')
                .send({message: `Session added!`, user: user});
        })
        .catch(error => {
            return res.status(500)
                .setHeader('content-type', 'application/json')
                .send({error: `Server error: ${error.name}`});
        });
});

module.exports = router;