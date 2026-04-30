import express  from "express";

import { calculateBmi } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json())

app.use(express.json());

app.get('/hello',(_req,res)=>{
    return res.send('Hello Full Stack!');
})

app.post('/exercises',(_req,res)=> {
    const {daily_exercises, target} = _req.body;

    console.log(daily_exercises,target)
    if(!daily_exercises || !target){
        return res.status(400).json({error:'parameters missing'})
    }

    try{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = calculateExercises(daily_exercises,Number(target))
        console.log(data)
        return res.status(200).json(data)

    }catch(error){
        let message = 'error'
        if(error instanceof Error){ 
            message = error.message
        }

       return res.status(400).json({error:message})
    }
})


app.get('/bmi',(_req,res)=>{
     const {height ,weight}= _req.query
    

    try{
        const data = calculateBmi(Number(height),Number(weight))
        return res.status(200).json(data)

    }catch(error){
        let message = 'Error'
        if(error instanceof Error){
                message = error.message
        }
        return res.status(400).json({error:message})
    }
})




const PORT = 3000
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})

