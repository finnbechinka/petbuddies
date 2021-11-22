const express = require('express')
const router = express.Router()
const { Message } = require('../models');

router.get('/getall', async (req, res) => {
    const listOfMessages = await Message.findAll();
    res.json(listOfMessages);
});

router.post('/new', async (req, res) => {
    const message = req.body;
    await Message.create(message);
    res.json(message);
});

module.exports = router;