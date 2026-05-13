import express,{ type Request,type Response,type NextFunction } from "express";
import type { NewPatient, Patient_safe,Entry, NewEntry }from "../../types.ts";
import patientService from "../services/PatientService.ts";
import  { NewPatientSchema,EntrySchema } from "../../types.ts";

type ErrorMsg = {
    error:string
};

const router = express.Router();

router.get('/',(_req,res:Response<Patient_safe[]>)=>{
    res.json(patientService.getAll_safe());
});

router.get('/:id',(_req,res:Response<Patient_safe|ErrorMsg>)=>{
    const id = _req.params.id;
    try{
    const data = patientService.getById(id);
   return  res.json(data);
    }catch(err){
        if(err instanceof Error){
           return  res.status(401).json({error:err.message});
        }
    return res.status(401).json({error:'something went wrong'});
        
    }
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

const newEntryParser = (req:Request,_res:Response,next:NextFunction) =>{
    try{
        EntrySchema.parse(req.body);
        next();
    }catch(error:unknown){
        next(error);
    }
};

router.post('/:id/entries',newEntryParser,(req:Request<{id:string},unknown,NewEntry>,res:Response<Entry|ErrorMsg>)=>{  
const id = req.params.id;
const body = req.body;
 const addedData = patientService.addEntry(id,body);
    return res.json(addedData);
});

export default router;