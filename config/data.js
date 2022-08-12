const Role = require('../models/role');
const Session = require('../models/session');
const User = require('../models/user');
const Question = require('../models/question');

const db = require('./db');

async function populateData() {
    await Role.sync();
    const countRole = await Role.count() || 0;
    if (countRole === 0) {
        await Role.create({id: 0, title: 'Admin'});
        await Role.create({id: 1, title: 'Parent 1'});
        await Role.create({id: 2, title: 'Parent 2'});
        await Role.create({id: 3, title: 'Child'});
    }

    await User.sync();
    const countUser = await User.count() || 0;
    if (countUser === 0) {
        // Admin
        await User.create({code: 9000, RoleId: '0'});

        // Testing Users
        await User.create({code: 101, RoleId: '1'});
        await User.create({code: 102, RoleId: '2'});
        await User.create({code: 103, RoleId: '3'});
        await User.create({code: 501, RoleId: '1'});
        await User.create({code: 502, RoleId: '2'});
        await User.create({code: 503, RoleId: '3'});
    }

    await Session.sync();
    const countSession = await Session.count() || 0;
    if (countSession === 0) {
        //Admin Session
        await Session.create({id: 9000, code: "9000", activated: true, start_date: "2022-01-01T12:00", end_date: "2100-01-31T12:00", status: "Active"});

        //Test Sessions
        await Session.create({id: 100, code: "101", activated: true, start_date: "2022-01-01T12:00", end_date: "2100-01-31T12:00", status: "Active"});
        await Session.create({id: 100, code: "102", activated: true, start_date: "2022-01-01T12:00", end_date: "2100-01-31T12:00", status: "Active"});
        await Session.create({id: 100, code: "103", activated: true, start_date: "2022-01-01T12:00", end_date: "2100-01-31T12:00", status: "Active"});
        await Session.create({id: 500, code: "501", activated: true, start_date: "2022-01-01T12:00", end_date: "2100-01-31T12:00", status: "Active"});
        await Session.create({id: 500, code: "502", activated: true, start_date: "2022-01-01T12:00", end_date: "2100-01-31T12:00", status: "Active"});
        await Session.create({id: 500, code: "503", activated: true, start_date: "2022-01-01T12:00", end_date: "2100-01-31T12:00", status: "Active"});
    }

    await Question.sync();
    const countQuestion = await Question.count() || 0;
    if (countQuestion === 0) {
        await Question.create({title: "Parent: Who's the founder of Facebook?", options: ["Mark Zuckerberg", "Bill Gates", "Steve Jobs", "Elon Musk"], "correct_option": "Mark Zuckerberg", type: 'parent', phase: 'A'});
        await Question.create({title: "Parent: What technology is used to record cryptocurrency transactions?", options: ["Digital wallet", "Mining", "Blockchain", "Token"], "correct_option": "Mining", type: 'parent',phase: 'A'});
        await Question.create({title: "Parent: Why is Big Data important?", options: ["Because it is structured", "Because it may be analyzed to reveal patterns and trends", "Because of its complexity", "Because of its size"], "correct_option": "Because it may be analyzed to reveal patterns and trends", type: 'parent', phase: 'A'});
        await Question.create({title: "Parent: What technology is used to make telephone calls over the Internet possible?", options: ["Bluetooth", "Ethernet", "NFC", "VoIP"], "correct_option": "VoIP", type: 'parent', phase: 'A'});
        await Question.create({title: "Child: Who's the founder of Facebook?", options: ["Mark Zuckerberg", "Bill Gates", "Steve Jobs", "Elon Musk"], "correct_option": "Mark Zuckerberg", type: 'child', phase: 'A'});
        await Question.create({title: "Child: What technology is used to record cryptocurrency transactions?", options: ["Digital wallet", "Mining", "Blockchain", "Token"], "correct_option": "Mining", type: 'child',phase: 'A'});
        await Question.create({title: "Child: Why is Big Data important?", options: ["Because it is structured", "Because it may be analyzed to reveal patterns and trends", "Because of its complexity", "Because of its size"], "correct_option": "Because it may be analyzed to reveal patterns and trends", type: 'child', phase: 'A'});
        await Question.create({title: "Child: What technology is used to make telephone calls over the Internet possible?", options: ["Bluetooth", "Ethernet", "NFC", "VoIP"], "correct_option": "VoIP", type: 'child', phase: 'A'});
    }

    // Sync DB
async function init() {
    await db.sync();
}

init();
}

module.exports = {populateData};