import * as formApi from "../api/controllers/formController";
import * as questionApi from "../api/controllers/questionController";

module.exports = (router)=>{
    router.get('/', (req,res)=>{
        res.status(200);
        res.json({ status: 'Up and Running!' });
      });
    
    router.get("/forms/getall",formApi.getForms);
    router.get("/forms/get/:id",formApi.getFormById);
    router.post("/forms/update",formApi.updateForm);
    router.post("/forms/create",formApi.createForm);
    router.get("/form/:id",formApi.getFormShared);


    router.post("/questions/add",questionApi.addQuestion);
    router.get("/questions/delete/:id",questionApi.deleteQuestion);
    router.post("/questions/update",questionApi.updateQuestion);
}