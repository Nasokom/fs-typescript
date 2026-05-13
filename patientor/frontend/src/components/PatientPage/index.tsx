import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import diagnosesService from '../../services/diagnoses';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { Female, Male,Transgender} from '@mui/icons-material';
import { type Gender, type Patient,type Entry,type Diagnosis, type NewEntry} from '../../types';
import EntryComponent from './EntryComponent';
import axios from 'axios';
import AddEntryModal from '../AddEntryModal';

export default function PatientPage (){

    const [patient,setPatient] = useState<Patient|null>(null);
    const [diagnoses,setDiagnoses]=useState<Diagnosis[]|null>(null);

    const {id} = useParams();

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  }; 

    useEffect( ()=>{
            diagnosesService.getAll().then(data=>setDiagnoses(data));
            if(id){
               patientService.getById(id).then(data=>setPatient(data));
}

    },[id]);

    if(!patient || !id){
        return null;
    }

 const submitNewEntry = async (newEntry: NewEntry) => {
    try {
      const addedEntry = await patientService.addEntry(id,newEntry);
      setPatient({...patient,entries:[...patient.entries,addedEntry]});
      setModalOpen(false);
    } catch (e: unknown) { 
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "object") {
            const datas = e.response.data.error;
          const errs = datas.map((err:{path:string[],code:string})=> err.path[0]+": "+ err.code);
          return setError(errs.join(', '));
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };


function genderIcon(gender:Gender) {

    switch(gender){
        case 'male':
            return <Male/>;
            
            case 'female':
                return <Female/>;
                default:  return <Transgender/>;
            }
        }

    return  (
        <div>
            <h2>{patient.name}  {genderIcon(patient.gender)}</h2>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <p>date of birth: {patient.dateOfBirth}</p>


        <AddEntryModal
          modalOpen={modalOpen}
         onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}/>

        <Button variant="contained" name="Add New Entry" onClick={() => openModal()}>
                Add New Entry
        </Button>

        {patient.entries && (
            <>
            <h4>Entries</h4>
            <div className='entry-list'>
            {patient.entries.map((entry:Entry)=>(
                <div className='entry'>
                <EntryComponent entry={entry}/>
                {entry.diagnosisCodes && 
                    <ul>
                    {entry.diagnosisCodes
                    .map((c:string)=><li>{c} {diagnoses?.find(d=>d.code === c)?.name}</li>)} 
                    </ul>
                }
            </div>
        ))}
            </div>
            </>
        )}
        </div>
    );


}

