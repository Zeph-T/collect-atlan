import mongoose  from "mongoose";
import Integration from "../../models/integration";


export function getIntegrationGoogleSheets(req,res){
    try {
        if (req.params.formId) {
            Integration.findOne({ formId: mongoose.Types.ObjectId(req.params.formId), type: "GOOGLE_SHEETS", isValid: true }).then(oIntegration => {
                return res.status(200).send(oIntegration);
            }).catch(err => res.status(400).send({ error: err }))
        } else throw new Error('No Form ID');
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }
}