import { authorize } from "./auth"
import { google } from 'googleapis';


export async function trackDataGoogleSheet(req, res) {
    try {
        if (req.body && req.body.formId) {
            authorize().then(async (auth) => {
                const sheets = google.sheets({ version: 'v4', auth: auth });

                const response = await sheets.spreadsheets.create({
                    resource: {
                        properties: { title: req.body.formId }
                    }
                });
                console.log(response)
                return res.status(200).send(response)
            }).catch(err=>{
                console.log(err);
                return res.send(err);
            })
        } else throw new Error('No Form ID');
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }
}


