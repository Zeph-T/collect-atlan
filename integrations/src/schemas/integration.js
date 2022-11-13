const mongoose = require("mongoose");
const {integrations} = require("../utilities");

const integrationSchema = mongoose.Schema({
    formId : {
        type : mongoose.Types.ObjectId,
        ref : "Form"
    },
    metadata : {},
    type : {
        type : String,
        enum : integrations
    },
    isValid : {
        type : Boolean,
        default : true
    }
})

export default integrationSchema;