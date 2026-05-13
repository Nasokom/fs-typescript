import axios from "axios"
import type { NewDiaryEntry } from "../../backend/src/types"
const BASE_URL = 'http://localhost:3000/api/diaries'

const getAll = async() =>{
        const data = await axios.get<NewDiaryEntry[]>(BASE_URL)
        return data
}


const addDiary = async (newDiary:NewDiaryEntry)=>{

        const data = await axios.post<NewDiaryEntry>(BASE_URL,newDiary)
        console.log(data)
        return data
}


export default {getAll,addDiary}