const {Review} = require('../models/review');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const reviewList = await Review.find();

    if(!reviewList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(reviewList);
})

router.get('/:id', async(req,res)=>{
    const review = await Review.findById(req.params.id);

    if(!review) {
        res.status(500).json({message: 'The review with the given ID was not found.'})
    } 
    res.status(200).send(review);
})


router.post('/', async (req,res)=>{
    let review = new Review({
        name: req.body.name,
        userimage: req.body.userimage,
        comment: req.body.comment,
        commentimages: req.body.commentimages,
        rating: req.body.rating,
        email: req.body.email
    })
    review = await review.save();

    if(!review)
    return res.status(400).send('the review cannot be created!')

    res.send(review);
})

router.delete('/:id', (req, res)=>{
    Review.findByIdAndRemove(req.params.id).then(review =>{
        if(review) {
            return res.status(200).json({success: true, message: 'the review is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "review not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

module.exports =router;