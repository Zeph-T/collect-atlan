import integrationSchema from "../schemas/integration";
import mongoose from "mongoose";

export default mongoose.model("integration",integrationSchema);