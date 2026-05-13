import { type CoursePart } from "../App";

interface PartProps{
  course:CoursePart
}
const Part = ({course}:PartProps) => {

switch(course.kind){
  case 'background':
    return( 
    <>
      <p>{course.description}</p>
      <p>
         submit to  <a href={course.backgroundMaterial}>{course.backgroundMaterial}</a>
      </p>
    </>
    )
  
  case 'basic':
    return <p>{course.description}</p>;
  
  case 'group':
    return <p>project exercices {course.groupProjectCount}</p>
  
  case 'special':
    return (
      <p> required skills:  {
        course.requirements.map((elt:string,i:number) => 
          (
            <span key={elt}>{elt}{i<course.requirements.length-1 && ', '}</span>
          )
        )}
      </p>
    )
  }
}

export default Part