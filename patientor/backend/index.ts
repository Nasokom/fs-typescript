import express from "express";
import cors from "cors";

import diagnosisRouter from "./src/routes/diagnosis.ts";
import patientRouter from "./src/routes/patient.ts";

import { errorMiddleware } from "./src/routes/middleware.ts";

const app = express();
app.use(cors());

app.use(express.json());

app.get('/api/ping',(_req,res)=>{
    console.log('pong');
    res.send('pong');
});

app.use('/api/diagnoses',diagnosisRouter);
app.use('/api/patients',patientRouter);
app.use(errorMiddleware);

const PORT = 3001;

app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
});