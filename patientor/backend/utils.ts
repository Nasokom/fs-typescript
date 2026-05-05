
import {type NewPatient, NewPatientSchema } from "./types.ts";


const parsedPatient = (object:unknown) : NewPatient=> {
    return NewPatientSchema.parse(object);
};



export default parsedPatient;