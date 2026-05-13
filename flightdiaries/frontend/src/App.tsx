import { useState,useEffect} from 'react'
import DiaryForm from './components/DiaryForm'
import DiaryList from './components/DiaryList'
import diaryService from './diaryService'
import { type NewDiaryEntry } from '../../backend/src/types'
import { AxiosError } from 'axios'

interface ErrorDetail{
  code:string,
  message:string,
  path:string[],
  values:[string|number]
}


function App() {

  const [diaries,setDiaries] = useState<NewDiaryEntry[]>([])
  const [errors,setErrors] = useState<string[]>([])

const onSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
  event.preventDefault();

  const form = event.currentTarget;

  const newDiary:NewDiaryEntry= {
    comment: form.comment.value,
    weather: form.weather.value,
    visibility:form.visibility.value,
    date:  form.date.value 
  }

  try{
   const {data} = await diaryService.addDiary(newDiary)
   setDiaries([...diaries,data])
   return
  }catch(error){
    if(error instanceof AxiosError){
      const logs = error.response?.data.error 
      setErrors(logs.map((l:ErrorDetail)=> ` Error: Incorrect ${l.path[0]}: ${form[l.path[0]].value || null }`))
      return 
    }
    console.log(error)
    setErrors(['something get Wrong'])
  }

};

  useEffect(()=>{
    try{
      diaryService.getAll().then(data => setDiaries(data.data) )
    }catch(err){
      console.log(err)
    }
  },[])


  return (
    <main>
      <DiaryForm onSubmit={onSubmit} errors={errors}/>
      <DiaryList diaries={diaries}/>
    </main>
  )
}

export default App
