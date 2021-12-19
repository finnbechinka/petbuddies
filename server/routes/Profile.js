const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { Profile, Image } = require('../models');

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null,'../client/src/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage: storage})

router.get('/', async (req, res) => {
    const listOfProfiles = await Profile.findAll();
    res.json(listOfProfiles);
});

router.post('/create', async (req, res) => {
    const profile = req.body;
    let profileObj = await Profile.create(profile);
    res.json(profileObj);
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

router.post('/uploadprofilepic', upload.single('image'), async (req, res) => {
    const {pid} = req.body;
    await Profile.update({profileImg: req.file.filename}, {where: {id: pid}});
})

router.post('/:id/edit', async (req, res) => {
    const pid = req.params.id;
    await Profile.update(req.body, {where: {id: pid}});
})

module.exports = router;