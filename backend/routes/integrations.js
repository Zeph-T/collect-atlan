import * as GoogleSheetsApi from '../api/controllers/integrations/google-sheets/main'

module.exports = (router) => {
    router.get("/",(req,res)=>{
        return res.send("Integrations Up and Running!");
    })
    router.post("/connect",GoogleSheetsApi.trackDataGoogleSheet)
}