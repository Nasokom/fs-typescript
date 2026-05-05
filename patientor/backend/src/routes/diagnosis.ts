import express , {type Response} from "express";
const router = express.Router();
import diagnosisService from "../services/diagnosisService.ts";
import type { Diagnosis } from "../../types.ts";

router.get('/',(_req,res:Response<Diagnosis[]>)=>{
    const data = diagnosisService.getDiagnosis();
    res.json(data);
});


export default router;