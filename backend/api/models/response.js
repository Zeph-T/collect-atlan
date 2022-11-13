const mongoose = require("mongoose");

const responseSchema = mongoose.Schema({
    createdOn : {
        type : Date,
        default : Date.now
    },
    data : {}
    
},{strict : false})

export default mongoose.model("response",responseSchema)