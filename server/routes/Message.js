const express = require('express')
const router = express.Router()
const { Message, User } = require('../models');
const { Op } = require("sequelize");

router.get('/', async (req, res) => {
    const listOfMessages = await Message.findAll();
    res.json(listOfMessages);
});

router.post('/', async (req, res) => {
    const tmpmessage = req.body;
    const message = await Message.create(tmpmessage);
    res.json(message);
});

router.post('/getchat', async (req, res) => {
    const { senderId, recipientId } = req.body;
    const chat = await Message.findAll({ where: { [Op.or]: [{ senderId: senderId, recipientId: recipientId }, { senderId: recipientId, recipientId: senderId }] } });
    if (chat) {
        res.json(chat)
    }
});

router.post('/getchats', async (req, res) => {
    const { uid } = req.body;
    const messages = await Message.findAll({ where: { [Op.or]: [{ senderId: uid }, { recipientId: uid }] } });
    let chatArr = []
    messages.forEach(e => {
        if (e.senderId == uid) {
            chatArr.push({ userId: e.recipientId, username: "" })
        }
        if (e.recipientId == uid) {
            chatArr.push({ userId: e.senderId, username: ""  })
        }
    });

    let uids = []
    chatArr.forEach(e => {
        if(!uids.includes(e.userId)){
            uids.push(e.userId);
        }
    });
    console.log(uids)
    if (uids) {
        res.json(uids)
    }
});

module.exports = router;