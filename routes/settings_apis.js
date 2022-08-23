const express = require('express');
const router = express.Router();

const Settings = require('../models/settings');

router.get('/settings', (req, res) => {
    Settings.findAll()
        .then(settings => {
            return res.status(200)
                .setHeader('content-type', 'application/json')
                .send(settings);
        })
        .catch(error => {
            return res.status(500)
                .setHeader('content-type', 'application/json')
                .send({error: `Server error: ${error.name}`});
        });
});

module.exports = router;