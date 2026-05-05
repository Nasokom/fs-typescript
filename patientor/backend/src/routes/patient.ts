import express,{ type Request,type Response,type NextFunction } from "express";
import type { NewPatient, Patient_safe }from "../../types.ts";
import patientService from "../services/PatientService.ts";
import  { NewPatientSchema } from "../../types.ts";

const router = express.Router();

router.get('/',(_req,res:Response<Patient_safe[]>)=>{
    res.json(patientService.getAll_safe());
});


const newPatientParser = (req:Request,_res:Response,next:NextFunction)=>{
try{
    NewPatientSchema.parse(req.body);
    next();
}catch(error:unknown){
    next(error);
}
};


router.post('/',newPatientParser,(req:Request<unknown,unknown,NewPatient>,res:Response<Patient_safe>)=>{
    const addedData = patientService.addPatient(req.body);
    res.json(addedData);
});

export default router;