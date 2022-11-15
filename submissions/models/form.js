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
    published : {
        type  : Date,
        default : Date.now
    },
    isValid : {
        type : Boolean,
        default : true
    },
    modified : {
        type : Date,
        default : Date.now
    }
})

export default mongoose.model("forms",formSchema)