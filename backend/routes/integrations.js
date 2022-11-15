import * as GoogleSheetsApi from '../api/controllers/integrations/google-sheets/main'
import * as integrationApi from "../api/controllers/integrations/integrations"

module.exports = (router) => {
    router.get("/",(req,res)=>{
        return res.send("Integrations Up and Running!");
    })
    router.post("/googlesheets/connect",GoogleSheetsApi.trackDataGoogleSheet)
    router.get("/get/:formId",integrationApi.getIntegrationGoogleSheets)
}