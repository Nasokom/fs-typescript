import {z} from "zod";

export const Gender = {
male:'male',
femalle:'female',
other:'other'
} as const;

export type Gender = typeof Gender[ keyof typeof Gender];

export const EntryType = {
  HealthCheck:'HealthCheck',
  Hospital:'Hospital',
  OccupationalHealthcare:'OccupationalHealthcare'
} as const;

export type EntryType = typeof EntryType[ keyof typeof EntryType];
export interface Diagnosis {
  code:string,
  name:string,
  latin?:string
} 

type Discharge = {
    date:string,
    criteria:string
};

type sickLeave = {
          startDate: string,
          endDate: string
};


const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

const baseEntry = z.object({
    description:z.string().min(2),
    date:z.iso.date(),
    specialist:z.string().min(2),
    diagnosisCodes:z.array(z.string().max(8).min(3)).optional()
});

 const healthCheckRatingSchema = baseEntry.safeExtend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.union([
    z.literal(HealthCheckRating.Healthy),
    z.literal(HealthCheckRating.LowRisk),
    z.literal(HealthCheckRating.HighRisk),
    z.literal(HealthCheckRating.CriticalRisk),
  ])
});

interface HealthCheckEntry extends BaseEntry {
  type:"HealthCheck";
  healthCheckRating: HealthCheckRating;
}

const hospitalEntrySchema = baseEntry.safeExtend({
    type:z.literal('Hospital'),
    discharge:z.object({ date:z.iso.date(), criteria:z.string().min(2)})
});
export interface HospitalEntry extends BaseEntry {
    type:'Hospital'
    discharge: Discharge
}

const occupationalHealthcareEntrySchema = baseEntry.safeExtend({
    type:z.literal('OccupationalHealthcare'),
    employerName:z.string().min(2),
    sickLeave:z.object({startDate:z.iso.date(),endDate:z.iso.date()}).optional()
});
export interface OccupationalHealthcareEntry extends BaseEntry{
    type:'OccupationalHealthcare'
    employerName:string,
    sickLeave?:sickLeave
}

export const EntrySchema = z.union([occupationalHealthcareEntrySchema,hospitalEntrySchema,healthCheckRatingSchema]);

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export const NewPatientSchema =z.object({
            name:z.string(),
            ssn:z.string(),
            occupation:z.string(),
            gender:z.enum(Gender),
            dateOfBirth:z.iso.date(),
});


export type NewPatient = z.infer<typeof NewPatientSchema>;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type NewEntry = UnionOmit<Entry, 'id'>;

export interface Patient extends NewPatient{
    id:string,
    entries: Entry[]
}

export type Patient_safe = Omit<Patient,'ssn'|'entries'>; 

// export type NewPatient = Omit<Patient,'id'>
