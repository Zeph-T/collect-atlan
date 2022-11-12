import { authorize } from "./auth"
import { google } from 'googleapis';
import Integration from "../../../models/integration";
import mongoose from "mongoose";
import Form from "../../../models/form";

export async function trackDataGoogleSheet(req, res) {
    try {
        if (req.body && req.body.formId) {
            Integration.findOne({ formId: mongoose.Types.ObjectId(req.body.formId), type: "GOOGLE_SHEETS", isValid: true }).then(oIntegration => {
                if (oIntegration) throw "Already Connected!";
                authorize().then(async (auth) => {
                    const sheets = google.sheets({ version: 'v4', auth: auth });

                    const response = await sheets.spreadsheets.create({
                        resource: {
                            properties: { title: req.body.formId }
                        }
                    });
                    const newIntegration = new Integration();
                    newIntegration.metadata = response.data;
                    newIntegration.type = "GOOGLE_SHEETS";
                    newIntegration.formId = mongoose.Types.ObjectId(req.body.formId);
                    newIntegration.save((err, oIntegration) => {
                        if (err) return res.status(400).send({ error: err });
                        else return res.status(200).send(oIntegration);
                    })
                }).catch(err => {
                    console.log(err);
                    return res.send(err);
                })
            }).catch(err => res.status(400).send({ error: err }))
        } else throw new Error('No Form ID');
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }
}

async function makeHeaderBold(sheets, spreadsheetId) {
    return new Promise(async (resolve, reject) => {
        const requests = [];
        requests.push(
            {
                "repeatCell": {
                    "range": {
                        "sheetId": '0',
                        "startRowIndex": 0,
                        "endRowIndex": 1
                    },
                    "cell": {
                        "userEnteredFormat": {
                            "backgroundColor": {
                                "red": 0.0,
                                "green": 0.0,
                                "blue": 0.0
                            },
                            "horizontalAlignment": "CENTER",
                            "textFormat": {
                                "foregroundColor": {
                                    "red": 1.0,
                                    "green": 1.0,
                                    "blue": 1.0
                                },
                                "fontSize": 12,
                                "bold": true
                            }
                        }
                    },
                    "fields": "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)"
                }
            }
        );


        const batchUpdateRequest = { requests };


        try {
            const response = await sheets.spreadsheets.batchUpdate({
                spreadsheetId,
                resource: batchUpdateRequest,
            });
            resolve(JSON.stringify(response, null, 2));
        } catch (err) {
            console.error(err);
            reject(err);
        }
    })
}

async function checkIfHeaderExists(sheets, spreadsheetId) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await sheets.spreadsheets.values.get({
                spreadsheetId: spreadsheetId,
                range: 'Sheet1!A1',
            });
            const rows = res.data.values;
            if (!rows || rows.length === 0) {
                resolve(false);
            } else {
                resolve(true);
            }
        } catch (err) {
            reject(err);
        }
    })
}

async function addDataSpreadSheet(sheets, spreadsheetId, values) {
    return new Promise((resolve, reject) => {
        const resource = {
            values,
        };
        sheets.spreadsheets.values.append(
            {
                spreadsheetId: spreadsheetId,
                range: 'Sheet1!A1',
                valueInputOption: 'RAW',
                resource: resource,
            },
            (err, result) => {
                if (err) {
                    // Handle error
                    reject(err);
                } else {
                    resolve(true);
                }
            }
        );
    })

}

export async function appendDataGoogleSheet(req, res) {
    try {
        if (req.params.formId) {
            Integration.findOne({ formId: mongoose.Types.ObjectId(req.params.formId), type: "GOOGLE_SHEETS", isValid: true }).then(oIntegration => {
                if (oIntegration === null) throw "No Integration Found!";
                authorize().then(async auth => {
                    const sheets = google.sheets({ version: 'v4', auth });
                    const obj = req.body;
                    const spreadsheetId = oIntegration.metadata.spreadsheetId;
                    const headerExists = await checkIfHeaderExists(sheets, spreadsheetId)
                    if (headerExists === false) {
                        const keys = [Object.keys(obj)];
                        await addDataSpreadSheet(sheets, spreadsheetId, keys);
                        await makeHeaderBold(sheets, spreadsheetId);
                    }
                    const values = [Object.values(obj)];
                    await addDataSpreadSheet(sheets, spreadsheetId, values)
                    return res.status(200).send("Added Data!");
                }).catch(err => {
                    console.log(err);
                    return res.send(err);
                })
            })
        } else {
            throw new Error("No Form Id found!");
        }
    } catch (err) {
        return res.send(err);
    }
}

