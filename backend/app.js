var dotenv = require("dotenv");
dotenv.config();
import express from "express";
import mongoose from "mongoose";
var bodyParser = require("body-parser");
import cors from "cors";
const mongodb_url = process.env.MONGODB_CONN_STRING;

mongoose
  .connect(mongodb_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB connected!");
  })
  .catch((err) => {
    console.log("Error Connecting DB" + err.stack);
  });

const port = process.env.PORT || 8000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var api = express.Router();
var integrations = express.Router();

app.use(cors());
require("./routes/secure")(api);
app.use("/api", api);

require("./routes/integrations")(integrations);
app.use("/integrations", integrations);

app.listen(port, () => {
  console.log(`server listening on PORT ${port}`);
});
