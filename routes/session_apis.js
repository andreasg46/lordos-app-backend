const express = require('express');
const router = express.Router();
const db = require('../config/db');
const {Op} = require("sequelize");

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

router.get('/session/:id', (req, res) => {
    const {id} = req.params;

    Session.findAll({
        where: {
            id: id
        }
    })
        .then(sessions => {
            if (sessions) {
                return res.status(200)
                    .setHeader('content-type', 'application/json')
                    .send(sessions);
            }
        })
        .catch(error => {
            return res.status(500)
                .setHeader('content-type', 'application/json')
                .send({error: `Server error: ${error.name}`});
        });
});

router.get('/session/users/:id/:code/', (req, res) => {
    const {id, code} = req.params;

    Session.findAll({
        where: {
            id: id,
            code:
                {
                    [Op.ne]: code
                }
        }
    })
        .then(users => {
            if (users) {
                return res.status(200)
                    .setHeader('content-type', 'application/json')
                    .send(users);
            } else {
                return res.status(404)
                    .setHeader('content-type', 'application/json')
                    .send({error: `Sessions not found for session id and code: ${id} ${code}!`});
            }
        })
        .catch(error => {
            return res.status(500)
                .setHeader('content-type', 'application/json')
                .send({error: `Server error: ${error.name}`});
        });
});

router.get('/session/user/:code', (req, res) => {
    const {code} = req.params;

    Session.findOne({
        where: {
            code: code
        }
    })
        .then(session => {
            if (session) {
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

router.get('/session/count/:id', (req, res) => {
    const {id} = req.params;

    Session.count({
        where: {
            id: id,
            activated: false
        }
    })
        .then(count => {
            return res.status(200)
                .setHeader('content-type', 'application/json')
                .send({count});
        })
        .catch(error => {
            return res.status(500)
                .setHeader('content-type', 'application/json')
                .send({error: `Server error: ${error.name}`});
        });
});

router.post('/session/create', async (req, res) => {
    const {id, code, end_date} = req.body;

    if (!id || !code) {
        return res.status(400)
            .setHeader('content-type', 'application/json')
            .send({error: `Missing parameters - code`});
    }

    Session.create({
        id: id,
        code: code || null,
        start_date: Date.now(),
        end_date: end_date || null,
    })
        .then(session => {
            return res.status(200)
                .setHeader('content-type', 'application/json')
                .send({message: `Session added!`, session: session});
        })
        .catch(error => {
            return res.status(500)
                .setHeader('content-type', 'application/json')
                .send({error: `Server error: ${error.name}`});
        });
});

router.put('/session/update/:id/:code', (req, res) => {
    const {id, code} = req.params;
    const {activated, start_date, end_date, status} = req.body;

    return db.transaction(async (t) => {
        const session = await Session.findOne({where: {[Op.and]: [{id: id}, {code: code}]}})

        if (!session) {
            return res.status(404)
                .setHeader('content-type', 'application/json')
                .send({error: `Session with id ${id} not found!`});
        }

        if (activated)
            session.activated = activated;

        if (start_date)
            session.start_date = start_date;

        if (end_date)
            session.end_date = end_date;

        if (status)
            session.status = status;

        return session.save({transaction: t})
            .then(session => {
                res.status(200)
                    .setHeader('content-type', 'application/json')
                    .send({message: `Session updated!`, session: session});
            })
            .catch(error => {
                return res.status(409)
                    .setHeader('content-type', 'application/json')
                    .send({error: {error}});
            });
    })
        .catch(error => {
            return res.status(500)
                .setHeader('content-type', 'application/json')
                .send({error: `Server error: ${error.name}`});
        });
});

router.put('/sessions/update/:id/', async (req, res) => {
    const {id} = req.params;
    const {start_date, end_date, status} = req.body;

    await Session.update(
        {
            start_date: start_date,
            end_date: end_date,
            status: status,
        },
        {
            where: {
                id: id,
            },
        }
    ).then((session) => {
        res.status(200)
            .setHeader('content-type', 'application/json')
            .send({message: `Sessions updated!`, session: session});
    })
        .catch(error => {
            return res.status(500)
                .setHeader('content-type', 'application/json')
                .send({error: {error}});
        });

});

module.exports = router;