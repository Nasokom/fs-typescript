export interface resultObject{

  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1|2|3;
  ratingDescription:string,
  target: number;
  average: number;

}

export function  calculateExercises(hours:number[],target:number):resultObject{
    
    const parsedHours = hours.map(h=>Number(h))
    const notValidArrayEntries = hours.find(h => isNaN(Number(h)))
    
    if(!hours || !target || notValidArrayEntries ){
        throw new Error('malformatted parameters')
    }

    const periodLength = parsedHours.length
    const trainingDays = parsedHours.filter((value:number)=> value > 0).length
    const average = parsedHours.reduce((a,sum) => a+sum,0)/periodLength
    const success = average >= target  

    const coef = average/target

    const rating = coef >= 1 ? 3 :
    coef <= 0.5 ? 1 : 2

    
    const ratingDescription = 
    rating === 1 ? 'bad'//'consistence is the key, you can do it' 
    : rating === 3  ? 'Congratulation you reach your target, try to increase the goal for more challenge !'
    :'not too bad but could be better' 



   return  { 
  periodLength,
  trainingDays,
  success,
  rating,
  ratingDescription,
  target,
  average
}

}

if (process.argv[1] === import.meta.filename) {
    
const targetValue = Number(process.argv[2])
const targetWeek = []

for ( let i = 3 ; i+=1 ; i < 0){
    const dayValue = Number(process.argv[i])

    if(isNaN(dayValue)){
        i = -1
        break
    }
    targetWeek.push(dayValue)
}


console.log(calculateExercises(targetWeek,targetValue))
}