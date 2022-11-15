const mongoose = require("mongoose");

const responseSchema = mongoose.Schema({
    createdOn : {
        type : Date,
        default : Date.now
    },
    data : {},
    formId : {
        type : mongoose.Types.ObjectId,
        ref : 'form',
        required : true
    }
},{strict : false})

export default mongoose.model("responses",responseSchema)