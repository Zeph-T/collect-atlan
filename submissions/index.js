import express from "express";
import mongoose from "mongoose";
var bodyParser = require("body-parser");
import cors from "cors";
const mongodb_url = process.env.MONGODB_CONN_STRING;
import Form from "./models/form";
import Response from "./models/response";

mongoose
  .connect(mongodb_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB connected!");
  })
  .catch((err) => {
    console.log("Error Connecting DB" + err.stack);
  });

const port = process.env.PORT || 8002;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.get("/",(req,res)=>{
  return res.send("Submissions API, Up and Running!")
})

app.post("/submit/:formId",(req,res)=>{
    try{
        if(req.params.formId){  
            Form.findOne({_id : mongoose.Types.ObjectId(req.params.formId),isValid : true})
            .then(oForm=>{
                if(!oForm || (oForm.status !== "Live"))throw new Error("Invalid Form!");
                
                let newResponse = new Response();
                newResponse.formId = oForm._id;
                newResponse.data = req.body;

                newResponse.save((err,oResponse)=>{
                    if(err)return res.status(400).send({error : err});
                    else return res.status(200).send({status : "Submitted!"});
                })
            })
        }else{
            throw new Error("No Form Id!");
        }
    }catch(err){
        return res.status(400).send({error : err});
    }
})


app.listen(port, () => {
  console.log(`server listening on PORT ${port}`);
});
