import * as googleSheetIntegrationApi from "./src/api/google-sheets/main";
import Integration from "./src/models/integration";
import mongoose from "mongoose";


exports.handler = async function(event,context){
    try{
        let response = event.fullDocument;
        const formData = response.data;
        const formId = response.formId;
        let integrations = await Integration.find({formId : mongoose.Types.ObjectId(formId.toString())})
        if(integrations){
            integrations.forEach(oIntegration=>{
                switch(oIntegration.type){
                    case "GOOGLE_SHEETS" : googleSheetIntegrationApi.appendDataGoogleSheet(formId,formData,oIntegration);
                        break;
                }
            })
        }
    }catch(err){
        console.log(err);
    }
}