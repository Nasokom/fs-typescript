
interface Totalprops{
    totalExercises:number
}

const Total = ({totalExercises}:Totalprops) => {

  return (
    <>
    <br/>
    <p>Number of exercices {totalExercises}</p>
    </>
  )
}

export default Total