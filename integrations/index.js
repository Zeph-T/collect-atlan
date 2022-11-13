require("./utils/dbConnect");
import responseSchema from "./src/schemas/response";

import mongoose from "mongoose";
const { handler } = require("./integrations");

const { watch } = require("./utils/helper");

const responseModel = mongoose.model('responses',responseSchema);

watch(
    responseModel,
    ['insert'],
    [handler]
)



console.log("Event Listener is running!");