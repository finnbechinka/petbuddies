const express = require('express')
const router = express.Router()
const { BuddyList } = require('../models');

router.get('/', async (req, res) => {
    const listOfBuddyLists = await BuddyList.findAll();
    res.json(listOfBuddyLists);
});

router.post('/', async (req, res) => {
    const buddyList = req.body;
    await BuddyList.create(buddyList);
    res.json(buddyList);
});

module.exports = router;