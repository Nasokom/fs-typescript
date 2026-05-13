import { Favorite} from "@mui/icons-material";
import type {Entry, OccupationalHealthcareEntry,HospitalEntry,HealthCheckEntry } from "../../types";
import { type ReactNode } from 'react';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

const BaseEntryComponent = ({entry,children,employer}:{entry:Entry,children:ReactNode,employer?:string})=>{

const renderIcon = ()=>{

    switch(entry.type){
        case "Hospital":
            return <LocalHospitalIcon/>;
        case "OccupationalHealthcare":
            return <MedicalInformationIcon/>;
        case "HealthCheck":
            return <MonitorHeartIcon/>;
    };
};

    return (
        <div >
            <p>{entry.date} {renderIcon()} {employer && employer}</p>
            <p>{entry.description}</p>
            {children}
            <p>diagnose by {entry.specialist}</p>
        </div>
    );

};

const HospitalEntryComponent = ({entry}:{entry:HospitalEntry}) =>{

    return (
            <BaseEntryComponent entry={entry}>
            <p>discharge: {entry.discharge.criteria}  date :{entry.discharge.date}</p>
            </BaseEntryComponent>
    );
};

const OccupationalHealthcareEntry = ({entry}:{entry:OccupationalHealthcareEntry})=>{

    return (
            <BaseEntryComponent entry={entry} employer={entry.employerName}>
               {entry.sickLeave && <p>sick Leave start : {entry.sickLeave?.startDate} end :{entry.sickLeave?.endDate}</p>}
            </BaseEntryComponent>
    );
};

const HealthCheckEntry=({entry}:{entry:HealthCheckEntry})=>{

    const color = ['green','yellow','orange','red'];
    return (
            <BaseEntryComponent entry={entry}>
               <Favorite style={{fill:color[entry.healthCheckRating]}}/>
            </BaseEntryComponent>
    );
};


const EntryComponent = ({entry}:{entry:Entry}) =>{

switch(entry.type){
    case "HealthCheck":
        return <HealthCheckEntry entry={entry}/>;
    case "Hospital":
        return <HospitalEntryComponent entry={entry}/>;
    case "OccupationalHealthcare":
        return <OccupationalHealthcareEntry entry={entry}/>;
}

};

export default EntryComponent;