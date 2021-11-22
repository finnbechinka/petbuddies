const express = require('express')
const router = express.Router()
const { Image } = require('../models');

router.get('/getall', async (req, res) => {
    const listOfImages = await Image.findAll();
    res.json(listOfImages);
});

router.post('/new', async (req, res) => {
    const image = req.body;
    await Image.create(image);
    res.json(image);
});

module.exports = router;