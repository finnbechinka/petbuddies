const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { Profile, BuddyList } = require('../models');
const { Op } = require("sequelize");

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

router.post('/otherprofiles', async (req, res) => {
    const {userid} = req.body;
    const profiles = await Profile.findAll({ where: {UserId: {[Op.not]: [userid]}}});
    //console.log(profiles)
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

router.post('/addtolist', async (req, res) => {
    let buddie = req.body;
    const check = await BuddyList.findOne({where: {ownerId: req.body.ownerId, buddieId: req.body.buddieId}});
    if(check){
        res.json({error: "Das Profil ist schon in deiner Liste!"})
    }else{
        await BuddyList.create(buddie);
    }
})

router.post('/mylist', async (req, res) => {
    const {userid} = req.body;
    const mylist = await BuddyList.findAll({ where: {ownerId: userid}});
    let myBuddieIds = []
    mylist.forEach(element => {
        myBuddieIds.push(element.buddieId)
    });
    const myBuddies = await Profile.findAll({where: {id: myBuddieIds}})
    res.json(myBuddies)
})

router.post('/isonmylist/:id', async (req, res) => {
    const pid = req.params.id;
    const {uid} = req.body;
    const buddie = await BuddyList.findOne({where: {ownerId: uid, buddieId: pid}});
    if(buddie){
        res.json({status: true});
    }else{
        res.json({status: false});
    }
})

module.exports = router;