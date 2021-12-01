const express = require('express')
const router = express.Router()
const { BuddyPreference } = require('../models');

router.get('/', async (req, res) => {
    const listOfBuddyPreference = await BuddyPreference.findAll();
    res.json(listOfBuddyPreference);
});

router.post('/', async (req, res) => {
    const buddyPreference = req.body;
    await BuddyPreference.create(buddyPreference);
    res.json(buddyPreference);
});

module.exports = router;