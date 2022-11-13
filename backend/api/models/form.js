const mongoose = require("mongoose");


const formSchema = mongoose.Schema({
    name : {
        type : String,
        requried : true
    },
    status : {
        type : String,
        enum : ["Paused" , "Draft" , "Live"],
        default : "Draft"
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

export default mongoose.model("forms",formSchema)