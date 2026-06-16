const mongoose = require('mongoose')
require('dotenv').config()
let connection=async()=>{
    try{
        mongoose.connect(process.env.Connection_String)
        console.log("Connected to Database")
    }catch(err){
        console.log("Not connected");
    }
}

module.exports = connection;