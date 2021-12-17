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

router.post('/myprofiles', async (req, res) => {
    const {userid} = req.body;
    const profiles = await Profile.findAll({ where: {UserId: userid}});
    res.json(profiles);
});

router.get('/byid/:id', async (req, res) => {
    const id = req.params.id;
    let profile = await Profile.findByPk(id);
    res.json(profile);
})

module.exports = router;