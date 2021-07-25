import React, {useState} from "react"
import axios from "axios"

const CreateComponent = props => {

    const {submitState, setSubmitState} = props

    const [formState, setFormState] = useState({
        title:"",
        price : 0,
        description: ""
    })

    const [validState, setValidState] = useState({})



    const changeHandler = e => {
        setFormState({
            ...formState,
            [e.target.name] : e.target.value
        })
    }

    const submitHandler = e => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/cats", formState)
            .then(res => {
                setFormState({
                    title:"",
                    price : 0,
                    description: ""
                })
                setSubmitState(!submitState)
            })
            .catch(err => {
                // console.log(err.response.data)
                const {errors} = err.response.data
                let errorObj = {}
                for(let [key, value] of Object.entries(errors)){
                    errorObj[key] = value.message
                }
                setValidState(errorObj)
            })
    }


    return(
        <div>
            <h1>Product Manager</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label>Title </label>
                    <input type="text" name="title" id="" value={formState.title} onChange={changeHandler} />
                    {(validState.title) ? <p>{validState.title}</p>: null}
                </div>
                <div>
                    <label>Price </label>
                    <input type="number" defaultValue={0} name="price" id="" value={formState.price} onChange={changeHandler} />
                    {(validState.price) ? <p>{validState.price}</p>: null}
                </div>
                <div>
                    <label>Description </label>
                    <input type="text" name="description" id="" value={formState.description} onChange={changeHandler} />
                    {(validState.description) ? <p>{validState.description}</p>: null}
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}
export default CreateComponent