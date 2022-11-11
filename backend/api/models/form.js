const mongoose = require("mongoose");


const formSchema = mongoose.Schema({
    name : {
        type : String,
        requried : true
    },
    status : {
        type : String,
        enum : ["Paused" , "Draft" , "Live"]
    },
    createdOn : {
        type  : Date,
        default : Date.now
    },
    updatedOn : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.Schema(formSchema,"forms")