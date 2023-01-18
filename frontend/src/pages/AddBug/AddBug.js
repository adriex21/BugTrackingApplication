
import Main from '../../containers/Main/Main'
import { useState, useEffect } from 'react';
import { createBug } from '../../utils/requests'
import { useParams } from "react-router-dom";


const initialData = {
    repository: '',
    description: '',
    severity: '',
    priority: '',
}

const AddBug = (props) => {

    const [bug, setBug] = useState(initialData)
    const [errors, setErrors] = useState([])
    const params = useParams()

    const handleCreateBug = async () => {
        bug.project_id = params.project_id;
        const response = await createBug(bug)
        if(response){ return window.location.href = `/${params.project_id}/view` }
        return setErrors(['Something went wrong'])
    }

    return (
        <Main data={props.data}>
            <div className="w-full flex justify-center mt-10">
                <div className="w-[500px] bg-black rounded-md flex flex-col text-white p-5 gap-3">

                    <h1 className="font-bold text-2xl">Add new bug</h1>
                    <h1 className="">Add a new bug</h1>

                    {errors.map(error => (
                        <span key={error} className="text-red-500">{error}</span>
                    ))}

                    <input
                    placeholder='Repository'
                    value={bug.repository || ''}
                    onChange={(e) => {setBug({...bug, repository: e.target.value})}}
                    type="text" className="outline-none h-8 rounded-md text-black px-2"/>

                    <input
                    placeholder='Description'
                    value={bug.description || ''}
                    onChange={(e) => {setBug({...bug, description: e.target.value})}}
                    type="text" className="outline-none h-8 rounded-md text-black bg-white px-2"/>

                    <span className='text-white'>Severity</span>
                    <select
                    placeholder='Severity'
                    value={bug.severity || ''}
                    onChange={(e) => {setBug({...bug, severity: e.target.value})}}
                    type="text" className="outline-none h-8 rounded-md text-black"> 
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>

                    <span className='text-white'>Priority</span>
                    <select
                    placeholder='Priority'
                    value={bug.priority || ''}
                    onChange={(e) => {setBug({...bug, priority: e.target.value})}}
                    type="text" className="outline-none h-8 rounded-md text-black"> 
                        <option value="LOW">LOW</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HIGH">HIGH</option>
                        <option value="CRITICAL">CRITICAL</option>
                    </select>

                    <button onClick={handleCreateBug} className="bg-black border-2 border-white w-full text-white h-8 rounded-md text-sm font-bold">
                        Report new bug
                    </button>

                </div>
            </div>
        </Main>
    )
}

export default AddBug