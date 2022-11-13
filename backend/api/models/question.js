const mongoose = require("mongoose");
const {questionTypes} = require("../controllers/utilities")

const questionSchema = mongoose.Schema({
    question : {
        type : String,
        requried : true
    },
    formId : {
        type : mongoose.Types.ObjectId,
        ref : "Form"
    },
    isValid : {
        type : Boolean,
        default : true
    },
    description : {
        type : String
    },
    keyword : {
        type : String
    },
    isMandatory : {
        type : Boolean,
        default : false
    },
    maxCharacters : {
        type : Number,
        default : 250
    },
    type : {
        type : String,
        enum : questionTypes
    },
    metadata : {
        options : []
    }
})

export default mongoose.model("questions",questionSchema)