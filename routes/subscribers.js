
const express = require("express");
const router = express.Router();
const Subscriber = require('../models/subscribers');
const subscribers = require("../models/subscribers");

// get all subscriber
router.get('/',async (req,res)=>{
    try{
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    }catch(err){
        res.sendStatus(500).json({message:err.message})
    }
})

// get a subscriber
router.get('/:id',getSubscriber,(req,res)=>{
    res.json(res.subscriber)
})

// creating a subscriber
router.post('/',async(req,res)=>{
    const subscriber = new Subscriber({
        name:req.body.name,
        subscribedToChannel:req.body.subscribedToChannel,
        age:req.body.age
    })
    try{
        let newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    }catch(err){
        res.sendStatus(400).json({message:err.message})
    }
})

// update a subscriber
router.patch('/:id',getSubscriber,async (req,res)=>{
    if(req.body.name !== null){
        req.subscriber.name = req.body.name
    }
    if(req.body.subscribedToChannel !== null){
        req.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    if(req.body.age !== null){
        req.subscriber.age = req.body.age
    }

    try{
        const updatedSubscriber = await res.subscriber.save()
        re.json(updatedSubscriber)
    }catch(err){
        res.sendStatus(400).json({message:err.message})
    }
})

// delete a subscriber
router.delete('/:id',getSubscriber,async (req,res)=>{
    try{
        await res.subscriber.remove()
        res.json({message:"Deleted."})
    }catch(err){
        res.sendStatus(500).json({message:err.message})
    }
})

// middleware for repeated operations

async function getSubscriber(req,res,next){
    let subscriber
    try{
        subscriber = await Subscriber.findById(req.param.id)
        if(subscriber == null){
            return res.status(404).json({message:" Cannot find Subscriber"})
        }
    }catch(err){
        return res.status(500).json({mesage:err.message})
    }
    res.subscriber = subscriber
    next()
}


module.exports = router;