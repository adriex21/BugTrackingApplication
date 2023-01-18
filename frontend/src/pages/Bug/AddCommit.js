
import Main from '../../containers/Main/Main'
import { useState, useEffect } from 'react';
import { addCommit } from '../../utils/requests'
import { useParams } from "react-router-dom";


const initialData = {
   commit: '',
   status: 'Fixed'
}

const AddCommit = (props) => {

    const [bug, setBug] = useState(initialData)
    const [errors, setErrors] = useState([])
    const params = useParams()

    const handleCreateCommit = async () => {
        if(bug.repository === '') return setErrors(['Please fill all fields'])
        bug.bug_id = params.bug_id;
        const response = await addCommit(bug)
        if(response){ return window.location.href = `/${params.project_id}/view` }
        return setErrors(['Something went wrong'])
    }

    return (
        <Main data={props.data}>
            <div className="w-full flex justify-center mt-10">
                <div className="w-[500px] bg-black rounded-md flex flex-col text-white p-5 gap-3">

                    <h1 className="font-bold text-2xl">Add new commit</h1>
                

                    {errors.map(error => (
                        <span key={error} className="text-red-500">{error}</span>
                    ))}

                    <input
                    placeholder='Link to the solution'
                    value={bug.commit || ''}
                    onChange={(e) => {setBug({...bug, commit: e.target.value})}}
                    type="text" className="outline-none h-8 rounded-md text-black px-2"/>
                    
                    <select
                    placeholder='Link to the solution'
                    value={bug.status || ''}
                    onChange={(e) => {setBug({...bug, status: e.target.value})}}
                    type="text" className="outline-none h-8 rounded-md text-black px-2">
                        <option value="Fixed">Fixed</option>
                        <option value="In-Progress">In-Progress</option>
                        <option value="Open">Open</option>
                    </select>
                    

                    

                    <button onClick={handleCreateCommit} className="bg-black border-2 border-white w-full text-white h-8 rounded-md text-sm font-bold">
                        Add new commit
                    </button>

                </div>
            </div>
        </Main>
    )
}

export default AddCommit