const mongoose = require('mongoose')

const subscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    subscribedToChannel: {
        type: String,
        require: true
    },
    age:{
        type:Number,
        erquired:true
    },
    subscribeDate:{
        type:Date,
        required:true,
        default:Date.now
    }
})

module.exports = mongoose.model("Subscriber", subscriberSchema)