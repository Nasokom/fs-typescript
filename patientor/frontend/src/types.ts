export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

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


export const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

export type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
    type:'Hospital'
    discharge: Discharge
}

export interface OccupationalHealthcareEntry extends BaseEntry{
    type:'OccupationalHealthcare'
    employerName:string,
    sickLeave?:sickLeave
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries:Entry[]

}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type NewEntry = UnionOmit<Entry, 'id'>;