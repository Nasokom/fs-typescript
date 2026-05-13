import Part from "./Part"
import { type CoursePart } from "../App"

interface ContentProps{
  courseParts:CoursePart[]
}

const CourseElt = (course:CoursePart) => (
  <div>
    <h4> {course.name} {course.exerciseCount}</h4>
    <Part course={course}/>
    <br/>
  </div>
) 
  


const Content = ({courseParts}:ContentProps) => {
  return (
    <div >
 {courseParts.map((course:CoursePart)=>(
  <CourseElt key={course.name} {...course}/>))}
    </div>
  )
}

export default Content