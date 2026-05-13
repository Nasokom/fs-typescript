import {type Patient_safe, type Patient, type NewPatient,type NewEntry,type Entry } from "../../types.ts";
import data from "../data/patient.ts";
import { v1 as uuid } from 'uuid';

const getAll = ():Patient[] =>{
    return data;
};

const getById = (id:string): Patient|undefined=>{

    const patient = data.find((p:Patient) => p.id === id);
    if(!patient){
        throw new Error('No patient found with id'+id);
    }
    return patient;
};

const getAll_safe = ():Patient_safe[]=>{
// eslint-disable-next-line @typescript-eslint/no-unused-vars
    return  data.map(({ssn,...rest})=> ({...rest}));
};

const addPatient = (newPatient:NewPatient):Patient_safe  => {
    const addPatient = {...newPatient,id:uuid(),entries:[]};
    data.push(addPatient);
    //const {ssn,...rest} = addPatient;
   return addPatient;
};

const addEntry = (id:string,entry:NewEntry):Entry =>{
    const patient =  data.find(p=> p.id === id);
    if(!patient){
        throw new Error('No patient found with id: '+id);
    }
    const newEntry = {...entry, id:uuid()};
    
     data.forEach((patient:Patient)=>{
        if(patient.id === id){
            patient.entries.push(newEntry);
        }   
        return patient;
    });

    return newEntry;
};

export default {
    getAll,
    getAll_safe,
    addPatient,
    getById,
    addEntry
};