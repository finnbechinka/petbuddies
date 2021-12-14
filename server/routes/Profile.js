const express = require('express')
const router = express.Router()
const { Profile } = require('../models');

router.get('/', async (req, res) => {
    const listOfProfiles = await Profile.findAll();
    res.json(listOfProfiles);
});

router.post('/', async (req, res) => {
    const profile = req.body;
    await Profile.create(profile);
    res.json(profile);
});

router.post('/getmyprofiles', async (req, res) => {
    const {id} = req.body;
    const profiles = await Profile.findAll({ where: {UserId: id}});
    res.json(profiles);
});

module.exports = router;