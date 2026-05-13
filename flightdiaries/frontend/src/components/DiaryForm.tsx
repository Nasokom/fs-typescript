interface DiaryFormProps {
    onSubmit: React.SubmitEventHandler<HTMLFormElement>
    errors?:string[],
}

const DiaryForm = ({onSubmit,errors}:DiaryFormProps) => {

const visibility =[ 'great', 'good','ok','poor']
const weather= ['sunny','rainy','cloudy','stormy', 'windy']

  return (
    <div>
        <h3>Add New entry</h3>
        {errors && errors.map((err:string,i:number)=> <p className={'error'} key={i}>{err}</p>)}

        <form onSubmit={onSubmit}>
            <label htmlFor="date">
                date
                <input name='date' type="date"/>
            </label>
            <label htmlFor='visibility'>
                visibility :

                {visibility.map( (v:string) => (
                    <label key={v}>
                        {v}
                        <input type="radio" value={v} name="visibility" />
                    </label>
                ))}

            </label>
            <label htmlFor="weather">
                weather : 
                {weather.map(w =>(
                <label key={w}>
                    {w}<input type="radio" value={w} name='weather'/>
                </label>
                ))}
            </label>
            <label htmlFor="comment">
                comment
                <input type="text" name='comment'/>
            </label>

            <input type="submit" value={'add'} />
        </form>
    </div>
  )
}

export default DiaryForm