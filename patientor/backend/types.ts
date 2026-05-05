import {z} from "zod";

export const Gender = {
male:'male',
femalle:'female',
other:'other'
} as const;

export type Gender = typeof Gender[ keyof typeof Gender];

// DIAGMNOSE
//  {
//     "code": "H35.29",
//     "name": "Other proliferative retinopathy",
//     "latin": "Alia retinopathia proliferativa"
//   }
export interface Diagnosis {
    code:string,
    name:string,
    latin?:string
} 

// PATIENT
//   "id": "d2773336-f723-11e9-8f0b-362b9e155667",
//         "name": "John McClane",
//         "dateOfBirth": "1986-07-09",
//         "ssn": "090786-122X",
//         "gender": "male",
//         "occupation": "New york city cop"

export const NewPatientSchema =z.object({
            name:z.string(),
            ssn:z.string(),
            occupation:z.string(),
            gender:z.enum(Gender),
            dateOfBirth:z.iso.date()
});


export type NewPatient = z.infer<typeof NewPatientSchema>;

export interface Patient extends NewPatient{
    id:string,
}

export type Patient_safe = Omit<Patient,'ssn'>; 

// export type NewPatient = Omit<Patient,'id'>
