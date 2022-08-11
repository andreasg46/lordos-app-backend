const express = require('express');
const router = express.Router();
const OneSignal = require('onesignal-node');

const client = new OneSignal.Client('569117be-390c-4e5b-b865-f7522b09dcf2', 'ODM0MmFlYWEtNjRlZS00OWE3LTgxODMtZGNmZWYzNTU3Yjkw');
const twilioNumber = +12763257952;

router.get('/devices', async (req, res) => {
    client.viewDevices({limit: 300})
        .then(response => {
            return res.status(200)
                .setHeader('content-type', 'application/json')
                .send(response);
        })
        .catch(error => {
            return res.status(500)
                .setHeader('content-type', 'application/json')
                .send({error: `Server error: ${error.name}`});
        });
});

router.post('/web-push', async (req, res) => {
    let {session_id, headings, subtitle, campaign, datetime, topic, click_url} = req.body;

    headings = (headings === '' ? 'Default Heading' : headings);
    subtitle = (subtitle === '' ? 'Default Subtitle' : subtitle);
    campaign = (campaign === '' ? 'Default Campaign' : campaign);

    if (!session_id || !datetime || !topic || !click_url) {
        return res.status(400)
            .setHeader('content-type', 'application/json')
            .send({error: `Missing parameters - session_id,datetime,topic,click_url`});
    }

    const notification = {
        headings: {en: headings},
        subtitle: {en: subtitle},
        contents: {en: subtitle},
        name: campaign,
        web_push_topic: topic,
        url: click_url,
        send_after: datetime,
        filters: [
            {"field": "tag", "key": "session_id", "relation": "=", "value": session_id},
        ],
    };

    client.createNotification(notification)
        .then(body => {
            let response = body.body;
            response = {message: "Push Notification Send!", response, send_time: datetime}
            return res.status(200)
                .setHeader('content-type', 'application/json')
                .send(response);
        })
        .catch(error => {
            return res.status(500)
                .setHeader('content-type', 'application/json')
                .send({error: `Server error: ${error}`});
        });
});

router.post('/sms-push', async (req, res) => {
    let {session_id, subtitle, datetime, click_url} = req.body;

    if (!session_id || !datetime || !subtitle || !click_url) {
        return res.status(400)
            .setHeader('content-type', 'application/json')
            .send({error: `Missing parameters - session_id,datetime,topic,click_url`});
    }

    const sms = {
        "name": "Identifier for SMS Message",
        "sms_from": twilioNumber,
        "contents" : { en: "Questions are now available! "  + click_url},
        "send_after": datetime,
        "filters": [{"field": "tag", "key": "session_id", "relation": "=", "value": session_id},
        ],
    };

    client.createNotification(sms)
        .then(body => {
            let response = body;
            response = {message: "SMS Notification Send!", response, send_time: datetime}
            return res.status(200)
                .setHeader('content-type', 'application/json')
                .send(response);
        })
        .catch(error => {
            return res.status(500)
                .setHeader('content-type', 'application/json')
                .send({error: `Server error: ${error}`});
        });
});


module.exports = router;