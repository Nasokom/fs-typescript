import { useState,useEffect, SyntheticEvent} from 'react';
import { TextField,MenuItem,Select,Input,InputLabel,Grid,Button} from '@mui/material';
import { type NewEntry, EntryType,type Diagnosis, type HealthCheckRating,HealthCheckRating as HCE} from '../../types';
import { SelectChangeEvent } from '@mui/material';
import diagnosesService from '../../services/diagnoses';

const EntryForm = ({onCancel,onSubmit}:{onCancel:()=>void,onSubmit:(entry:NewEntry)=>void}) => {

  const typeOptions = Object.values(EntryType).map( (v)=>(
    {label:v.toString(),value:v}
  ));
  const healthCheckRatingOptions = ["Healthy","LowRisk","HighRisk","CriticalRisk"];
   //Object.entries(HealthCheckRating).map((v)=>({value:v,label:v.toString()}));
  const [icdData,setIcdData] = useState<Diagnosis[]>([]);
  const [entryType,setEntryType]=useState<EntryType>(EntryType.HealthCheck);
  const [date,setDate] = useState('');
  const [description,setDescription] = useState('');
  const [specialist,setSpecialise] = useState('');
  const [diagnosisCodes,setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating,setHealthCheckRating]= useState<HealthCheckRating>(0);
  const [employerName,setEmployerName] = useState('');
  const [discharge,setDischarge] =useState({date:'',criteria:''});
  const [sickLeave,setSickLeave] = useState({startDate:'',endDate:''});


  const onCheckRatingChange = (event:SelectChangeEvent<HCE>)=>{
 event.preventDefault();
      const value = Number(event.target.value);
      const rating = Object.values(HCE).find(g => g == value);
      if (rating) {
        setHealthCheckRating(rating);
    }
  };

  useEffect(()=>{
    diagnosesService.getAll().then((data)=>setIcdData(data));
  },[]);
  
  const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const addEntry = (event:SyntheticEvent)=>{
    event.preventDefault();
    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes,
    };
    // console.log(baseEntry);
    switch(entryType){
      case 'HealthCheck':
        return onSubmit({...baseEntry,type:entryType,healthCheckRating});
      case 'Hospital':
        return onSubmit({...baseEntry,type:entryType,discharge});
      case 'OccupationalHealthcare':
        return onSubmit({...baseEntry,employerName,type:entryType,sickLeave});
    };
  };

  return (
    <div>
      <form onSubmit={addEntry}>
      <TextField
        fullWidth 
          select
          label="Entry type"
          value={entryType}
        >
          {typeOptions.map((option) => (
            <MenuItem key={option.value} value={option.value} onClick={()=>setEntryType(option.value)}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
            name='Date'
            label="Date"
            value={date}
            fullWidth 
            onChange={(e)=>setDate(e.target.value)}
            placeholder='Date'
            type='date'
            />

        <TextField
          label="Description *"
          variant="outlined"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />

        <TextField
          label="Specialist *"
          variant="outlined"  
          value={specialist}
          onChange={(e)=>setSpecialise(e.target.value)}
        />
          <InputLabel sx={{ marginTop:0 }}>Diagnosis Codes</InputLabel>
         <Select
          label="Diagnosis Codes"
          multiple
          fullWidth
          displayEmpty
          onChange={handleChange}
          value={diagnosisCodes}
          renderValue={(selected) =>selected.length > 0 ?selected.map(s=><span className='diag-code'>{s}</span>) : <span style={{color:'grey'}}>Select codes</span>}
          >
          {icdData && icdData.map((option) => (
            <MenuItem key={option.code} value={option.code}>
              {option.code} - {option.name}
            </MenuItem>
          ))}
        </Select>
        
        {entryType === EntryType.HealthCheck && 
          <Select
            label="Health Check"
            value={healthCheckRating}
            //onChange={(e)=>setHealthCheckRating(e.target.value)}
            onChange={onCheckRatingChange}
          >
            {healthCheckRatingOptions.map((option,index:number) => (
              <MenuItem key={option} value={index} //onClick={()=>setHealthRating(index)}
              >
                {index} - {option}
              </MenuItem>
            ))}
          </Select>
        }

        {entryType === EntryType.Hospital && 
        <>
          <InputLabel>Discharge</InputLabel>
          <div style={{ display:'flex',gap:'10px'}}>
          <Input
           fullWidth
            type='date'
            value={discharge.date}
            onChange={(e)=>setDischarge({...discharge,date:e.target.value})}
            />
            <TextField
            fullWidth
            label="Criteria"
            value={discharge.criteria}
            onChange={(e)=>setDischarge({...discharge,criteria:e.target.value})}
            type='text'
            />
          </div>
          </>
        }
           {entryType === EntryType.OccupationalHealthcare && 
        <>
        <TextField  
          fullWidth
          label="Employer name"
          value={employerName}
          onChange={(e)=>setEmployerName(e.target.value)}
          type='text'
          />
          
          <InputLabel>SickLeave</InputLabel>
          <div style={{ display:'flex',gap:'10px'}}>
          <TextField
          label={'start Date'}
           fullWidth
            type='date'
            value={sickLeave.startDate}
            onChange={(e)=>setSickLeave({...sickLeave,startDate:e.target.value})}
            />
            <TextField
            fullWidth
            label="end Date"
            value={sickLeave.endDate}
            onChange={(e)=>setSickLeave({...sickLeave,endDate:e.target.value})}
            type='date'
            />
          </div>
          </>
        }

      <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
                <Grid size="auto">
                  <Button
                    color="secondary"
                    variant="contained"
                    type="button"
                    onClick={onCancel}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid size="auto">
                  <Button
                    type="submit"
                    variant="contained"
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>

        </form>
    </div>
  );
};

export default EntryForm;
