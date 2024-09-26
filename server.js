require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const subscribers = require('./routes/subscribers')

// const 

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error',(err)=>{console.log(err)})
db.once('open',(err)=>{console.log("Connected to Database")})

app.use(express.json())
app.use('/subscribers',subscribers)

app.listen(3000,()=>{
    console.log("Server started")
})