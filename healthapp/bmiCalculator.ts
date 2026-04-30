export const calculateBmi = (height:number,weight:number) =>{


    if(isNaN(height) || isNaN(weight) || height === 0 || weight === 0){
        throw new Error("malformatted parameters")
    }

    const range = Number((weight/ (height*height) * 10000).toFixed(2));

    let bmi = ''
    
    switch(true){
        case (range < 18.5):
            bmi = "Underweight";
            break
        
        case (range > 30):
            bmi =  "Obese";
            break
        
        case(range > 25):
            bmi =  "Overweight";
            break

        default:  bmi =  "Normal range";
    }

    return {height,weight,bmi}
}

if (process.argv[1] === import.meta.filename) {
const height = Number(process.argv[2])
const weight = Number(process.argv[3])

try{
    console.log(calculateBmi(height, weight))
}catch(err){
    let errorMsg = 'Something wrong '
    if(err instanceof Error){
        errorMsg += " Error : " + err.message
    }
    console.log(errorMsg)
}
}