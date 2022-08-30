const Role = require('../models/role');
const Session = require('../models/session');
const User = require('../models/user');
const Question = require('../models/question');
const Settings = require('../models/settings');

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
        // Testing Users
        await User.create({code: 101, RoleId: '1'});
        await User.create({code: 102, RoleId: '2'});
        await User.create({code: 103, RoleId: '3'});

        // Admin
        await User.create({code: 9001, RoleId: '0'});
        await User.create({code: 9002, RoleId: '0'});
        await User.create({code: 9003, RoleId: '0'});
    }

    await Session.sync();
    const countSession = await Session.count() || 0;
    if (countSession === 0) {
        //Test Sessions
        await Session.create({id: 100, code: "101", activated: false, start_date: "2022-01-01T12:00", end_date: "2100-01-31T12:00", status: "Inactive"});
        await Session.create({id: 100, code: "102", activated: false, start_date: "2022-01-01T12:00", end_date: "2100-01-31T12:00", status: "Inactive"});
        await Session.create({id: 100, code: "103", activated: false, start_date: "2022-01-01T12:00", end_date: "2100-01-31T12:00", status: "Inactive"});
        await Session.create({id: 500, code: "501", activated: false, start_date: "2022-01-01T12:00", end_date: "2100-01-31T12:00", status: "Inactive"});
        await Session.create({id: 500, code: "502", activated: false, start_date: "2022-01-01T12:00", end_date: "2100-01-31T12:00", status: "Inactive"});
        await Session.create({id: 500, code: "503", activated: false, start_date: "2022-01-01T12:00", end_date: "2100-01-31T12:00", status: "Inactive"});

        //Admin Session
        await Session.create({id: 9000, code: "9001", activated: true, start_date: "2022-01-01T12:00", end_date: "2100-01-31T12:00", status: "Active"});
        await Session.create({id: 9000, code: "9002", activated: true, start_date: "2022-01-01T12:00", end_date: "2100-01-31T12:00", status: "Active"});
        await Session.create({id: 9000, code: "9003", activated: true, start_date: "2022-01-01T12:00", end_date: "2100-01-31T12:00", status: "Active"});
    }

    await Question.sync();
    const countQuestion = await Question.count() || 0;
    if (countQuestion === 0) {
        // Phase A
        await Question.create({title: "Parent: Who's the founder of Facebook?", options: ["Mark Zuckerberg", "Bill Gates", "Steve Jobs", "Elon Musk"], "correct_option": "Mark Zuckerberg", type: 'parent', phase: 'A'});
        await Question.create({title: "Parent: What technology is used to record cryptocurrency transactions?", options: ["Digital wallet", "Mining", "Blockchain", "Token"], "correct_option": "Mining", type: 'parent',phase: 'A'});
        await Question.create({title: "Parent: Why is Big Data important?", options: ["Because it is structured", "Because it may be analyzed to reveal patterns and trends", "Because of its complexity", "Because of its size"], "correct_option": "Because it may be analyzed to reveal patterns and trends", type: 'parent', phase: 'A'});
        await Question.create({title: "Parent: What technology is used to make telephone calls over the Internet possible?", options: ["Bluetooth", "Ethernet", "NFC", "VoIP"], "correct_option": "VoIP", type: 'parent', phase: 'A'});
        await Question.create({title: "Child: Who's the founder of Facebook?", options: ["Mark Zuckerberg", "Bill Gates", "Steve Jobs", "Elon Musk"], "correct_option": "Mark Zuckerberg", type: 'child', phase: 'A'});
        await Question.create({title: "Child: What technology is used to record cryptocurrency transactions?", options: ["Digital wallet", "Mining", "Blockchain", "Token"], "correct_option": "Mining", type: 'child',phase: 'A'});
        await Question.create({title: "Child: Why is Big Data important?", options: ["Because it is structured", "Because it may be analyzed to reveal patterns and trends", "Because of its complexity", "Because of its size"], "correct_option": "Because it may be analyzed to reveal patterns and trends", type: 'child', phase: 'A'});
        await Question.create({title: "Child: What technology is used to make telephone calls over the Internet possible?", options: ["Bluetooth", "Ethernet", "NFC", "VoIP"], "correct_option": "VoIP", type: 'child', phase: 'A'});

        // Phase B
        await Question.create({title: "Parent: Who's the founder of Facebook?", options: ["Mark Zuckerberg", "Bill Gates", "Steve Jobs", "Elon Musk"], "correct_option": "Mark Zuckerberg", type: 'parent', phase: 'B'});
        await Question.create({title: "Parent: What technology is used to record cryptocurrency transactions?", options: ["Digital wallet", "Mining", "Blockchain", "Token"], "correct_option": "Mining", type: 'parent',phase: 'B'});
        await Question.create({title: "Parent: Why is Big Data important?", options: ["Because it is structured", "Because it may be analyzed to reveal patterns and trends", "Because of its complexity", "Because of its size"], "correct_option": "Because it may be analyzed to reveal patterns and trends", type: 'parent', phase: 'B'});
        await Question.create({title: "Parent: What technology is used to make telephone calls over the Internet possible?", options: ["Bluetooth", "Ethernet", "NFC", "VoIP"], "correct_option": "VoIP", type: 'parent', phase: 'B'});
        await Question.create({title: "Child: Who's the founder of Facebook?", options: ["Mark Zuckerberg", "Bill Gates", "Steve Jobs", "Elon Musk"], "correct_option": "Mark Zuckerberg", type: 'child', phase: 'B'});
        await Question.create({title: "Child: What technology is used to record cryptocurrency transactions?", options: ["Digital wallet", "Mining", "Blockchain", "Token"], "correct_option": "Mining", type: 'child',phase: 'B'});
        await Question.create({title: "Child: Why is Big Data important?", options: ["Because it is structured", "Because it may be analyzed to reveal patterns and trends", "Because of its complexity", "Because of its size"], "correct_option": "Because it may be analyzed to reveal patterns and trends", type: 'child', phase: 'B'});
        await Question.create({title: "Child: What technology is used to make telephone calls over the Internet possible?", options: ["Bluetooth", "Ethernet", "NFC", "VoIP"], "correct_option": "VoIP", type: 'child', phase: 'B'});

        // Phase C
        await Question.create({title: "Parent: Who's the founder of Facebook?", options: ["Mark Zuckerberg", "Bill Gates", "Steve Jobs", "Elon Musk"], "correct_option": "Mark Zuckerberg", type: 'parent', phase: 'C'});
        await Question.create({title: "Parent: What technology is used to record cryptocurrency transactions?", options: ["Digital wallet", "Mining", "Blockchain", "Token"], "correct_option": "Mining", type: 'parent',phase: 'C'});
        await Question.create({title: "Parent: Why is Big Data important?", options: ["Because it is structured", "Because it may be analyzed to reveal patterns and trends", "Because of its complexity", "Because of its size"], "correct_option": "Because it may be analyzed to reveal patterns and trends", type: 'parent', phase: 'C'});
        await Question.create({title: "Parent: What technology is used to make telephone calls over the Internet possible?", options: ["Bluetooth", "Ethernet", "NFC", "VoIP"], "correct_option": "VoIP", type: 'parent', phase: 'C'});
        await Question.create({title: "Child: Who's the founder of Facebook?", options: ["Mark Zuckerberg", "Bill Gates", "Steve Jobs", "Elon Musk"], "correct_option": "Mark Zuckerberg", type: 'child', phase: 'C'});
        await Question.create({title: "Child: What technology is used to record cryptocurrency transactions?", options: ["Digital wallet", "Mining", "Blockchain", "Token"], "correct_option": "Mining", type: 'child',phase: 'C'});
        await Question.create({title: "Child: Why is Big Data important?", options: ["Because it is structured", "Because it may be analyzed to reveal patterns and trends", "Because of its complexity", "Because of its size"], "correct_option": "Because it may be analyzed to reveal patterns and trends", type: 'child', phase: 'C'});
        await Question.create({title: "Child: What technology is used to make telephone calls over the Internet possible?", options: ["Bluetooth", "Ethernet", "NFC", "VoIP"], "correct_option": "VoIP", type: 'child', phase: 'C'});

    }

    await Settings.sync();
    const countSettings = await Settings.count() || 0;
    if (countSettings === 0) {
        await Settings.create({phaseA_time: "09:00:00", phaseA_deadline: "09:30:00", phaseB_time: "14:00:00",phaseB_deadline: "14:30:00" , phaseC_time: "18:00:00", phaseC_deadline: "18:30:00", deadline: "30"});

    }

    // Sync DB
async function init() {
    await db.sync();
}

init();
}

module.exports = {populateData};