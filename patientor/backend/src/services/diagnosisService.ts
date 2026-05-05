import type { Diagnosis } from "../../types.ts";
import data from "../data/diagnoses.ts";

const getDiagnosis = ():Diagnosis[] =>{
return data;
};

export default{
    getDiagnosis
};