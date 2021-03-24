const {Category} = require('../models/category');
const {Product} = require('../models/product');
const express = require('express');
const router = express.Router();
router.get(`/`, async (req, res) =>{
    const newarrivalsList = await Product.find().sort({$natural:-1}).limit(2);

    if(!newarrivalsList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(newarrivalsList);
})
module.exports =router;