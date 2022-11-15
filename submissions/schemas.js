import mongoose from "mongoose";

const standardSchema = new mongoose.Schema({}, { strict: false });


export const Form  = mongoose.model("forms",standardSchema);
export const Response = mongoose.model("responses",standardSchema);

