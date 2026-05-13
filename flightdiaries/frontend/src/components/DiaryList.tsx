import {type  NewDiaryEntry } from '../../../backend/src/types' 

interface DiaryListProps{
  diaries:NewDiaryEntry[]
}

const DiaryList = ({diaries}:DiaryListProps) => {

  return (

    <div>
      <h3>Diary Entries</h3>
    
      {diaries && 
      diaries.map((d:NewDiaryEntry)=>(
        <div key={d.date+d.visibility}>
          <h4>{d.date}</h4>
          <p> visibility: {d.visibility}</p>
          <p>weather:{d.weather}</p>
          {d.comment && <p>{d.comment}</p>}

        </div>
      ))
      
      }
    </div>
  )
}

export default DiaryList