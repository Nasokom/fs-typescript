import {type Patient_safe, type Patient, type NewPatient } from "../../types.ts";
import data from "../data/patient.ts";
import { v1 as uuid } from 'uuid';

const getAll = ():Patient[] =>{
    return data;
};

const getAll_safe = ():Patient_safe[]=>{
// eslint-disable-next-line @typescript-eslint/no-unused-vars
    return data.map(({ssn,...rest})=>{

        return {...rest};
    });
};

const addPatient = (newPatient:NewPatient):Patient_safe  => {
    const addPatient = {...newPatient,id:uuid()};
    data.push(addPatient);
    //const {ssn,...rest} = addPatient;
   return addPatient;

};

export default {
    getAll,
    getAll_safe,
    addPatient
};