const express = require('express')
const router = express.Router()
const { Image } = require('../models');

router.get('/', async (req, res) => {
    const listOfImages = await Image.findAll();
    res.json(listOfImages);
});

router.post('/', async (req, res) => {
    const image = req.body;
    await Image.create(image);
    res.json(image);
});

router.get('/byid/:id', async (req, res) => {
    const id = req.params.id;
    const image = await Image.findByPk(id);
    res.json(image);
});

module.exports = router;