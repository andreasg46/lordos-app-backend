const express = require('express');
const router = express.Router();

const OneSignal = require('onesignal-node');
const axios = require("axios");

const client = new OneSignal.Client(process.env.ONESIGNAL_APP_ID, process.env.ONESIGNAL_API_KEY);

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
                .send({error: `Server error: ${error}`});
        });
});

router.post('/device', async (req, res) => {
    let {phone, code, session_id} = req.body;

    let data = JSON.stringify({
        "phone": phone,
        "custom1": code,
        "custom2": session_id,
    });

    let config = {
        method: 'post',
        url: 'https://sms.to/v1/people/contacts/create',
        headers: {
            'Authorization': 'Bearer ' + process.env.SMSTO_API_KEY,
            'Content-Type': 'application/json'
        },
        data : data
    };

    axios(config)
        .then(function (response) {
            return res.status(200)
                .setHeader('content-type', 'application/json')
                .send(JSON.stringify(response.data));
        })
        .catch(error => {
            return res.status(500)
                .setHeader('content-type', 'application/json')
                .send({error: `Server error: ${error}`});
        });

});

router.post('/web-push', async (req, res) => {
    let {code, headings, subtitle, campaign, datetime, topic, click_url} = req.body;

    headings = (headings === '' ? 'Default Heading' : headings);
    subtitle = (subtitle === '' ? 'Default Subtitle' : subtitle);
    campaign = (campaign === '' ? 'Default Campaign' : campaign);

    if (!code || !datetime || !topic || !click_url) {
        return res.status(400)
            .setHeader('content-type', 'application/json')
            .send({error: `Missing parameters - code,datetime,topic,click_url`});
    }

    const notification = {
        headings: {en: headings},
        subtitle: {en: subtitle},
        contents: {en: subtitle},
        name: campaign,
        web_push_topic: topic,
        url: click_url,
        send_after: datetime,
        include_external_user_ids: [code]
        // filters: [
        //     {"field": "tag", "key": "session_id", "relation": "=", "value": session_id},
        // ],
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
    let {phone, message, datetime, click_url} = req.body;

    if (!phone || !message || !click_url) {
        return res.status(400)
            .setHeader('content-type', 'application/json')
            .send({error: `Missing parameters - code,message,datetime, click_url`});
    }

    let data = JSON.stringify({
        "message": message +  '\n' + click_url,
        "to": phone,
        "bypass_optout": false,
        "sender_id": "Lordos App",
        "scheduled_for": datetime,
        "timezone": "Europe/Nicosia"
    });

    let config = {
        method: 'post',
        url: 'https://api.sms.to/sms/send',
        headers: {
            'Authorization': 'Bearer ' + process.env.SMSTO_API_KEY,
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            return res.status(200)
                .setHeader('content-type', 'application/json')
                .send(response);
        })
        .catch(error => {
            return res.status(500)
                .setHeader('content-type', 'application/json')
                .send({error: `Server error: ${error}`});
        })

});

// router.post('/sms-push', async (req, res) => {
//     const twilioNumber = "+12763257952";
//     let {code, subtitle, datetime, click_url} = req.body;
//
//     if (!code || !datetime || !subtitle || !click_url) {
//         return res.status(400)
//             .setHeader('content-type', 'application/json')
//             .send({error: `Missing parameters - code,datetime,topic,click_url`});
//     }
//
//     const sms = {
//         "name": "Identifier for SMS Message",
//         "sms_from": twilioNumber,
//         "contents": {en: "Questions are now available! " + click_url},
//         "send_after": datetime,
//         "include_external_user_ids": [code]
//     };
//
//     client.createNotification(sms)
//         .then(body => {
//             let response = body;
//             response = {message: "SMS Notification Send!", response, send_time: datetime}
//             return res.status(200)
//                 .setHeader('content-type', 'application/json')
//                 .send(response);
//         })
//         .catch(error => {
//             return res.status(500)
//                 .setHeader('content-type', 'application/json')
//                 .send({error: `Server error: ${error}`});
//         });
// });

// router.post('/device', async (req, res) => {
//     let {device_type, identifier, session_id, external_user_id} = req.body;
//
//     await client.addDevice({
//         device_type: device_type,
//         identifier: identifier,
//         country: "CY",
//         tags: {
//             session_id: session_id
//         },
//         external_user_id: external_user_id
//     })
//         .then(response => {
//             response = {message: "Device Added!", response}
//             return res.status(200)
//                 .setHeader('content-type', 'application/json')
//                 .send(response);
//         })
//         .catch(error => {
//             return res.status(500)
//                 .setHeader('content-type', 'application/json')
//                 .send({error: `Server error: ${error}`});
//         });
//
// });

module.exports = router;