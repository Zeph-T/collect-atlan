const mongoose = require("mongoose");
const questionTypes = require("../controllers/utilities")

const questionSchema = mongoose.Schema({
    name : {
        type : String,
        requried : true
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
        optionLabels : []
    }
})

module.exports = mongoose.Schema(questionSchema,"questions")