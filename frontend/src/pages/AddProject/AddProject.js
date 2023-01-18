import { useParams } from "react-router-dom";
import Main from '../../containers/Main/Main'
import { useEffect, useState } from 'react'
import { createProject } from '../../utils/requests'


const initialData = {
    projectName: '',
    repository: '',
}


const AddProject = (props) => {
    const [project, setProject] = useState(initialData)
    const [errors, setErrors] = useState([])
    const params = useParams();


    const handleCreateProject = async () => {
        const response = await createProject(team)
        if(response){ return window.location.href = `/${params.teamName}/projects` }
        return setErrors(['Something went wrong'])
    }

    return (
        <Main data={props.data}>
            <div className="w-full flex justify-center mt-10">
                <div className="w-[500px] bg-blue-700 rounded-md flex flex-col text-white p-5 gap-3">
                    <h1 className="font-bold text-2xl">Create project for team {params.teamName}</h1>
                    <h1 className="">Create a new team by adding a name to be form below</h1>

                    {errors.map(error => (
                        <span key={error} className="text-red-500">{error}</span>
                    ))}

                    <input
                    placeholder='Project name'
                    value={project.teamName || ''}
                    onChange={(e) => {setTeam({projectName: e.target.value})}}
                    type="text" className="outline-none h-8 rounded-md text-black"/>

<input
                    placeholder='Repository'
                    value={project.teamName || ''}
                    onChange={(e) => {setTeam({projectName: e.target.value})}}
                    type="text" className="outline-none h-8 rounded-md text-black"/>

                    <button onClick={handleCreateProject} className="bg-[#171723] w-full text-white h-8 rounded-md text-sm font-bold">
                        Create new team
                    </button>

                </div>
            </div>
        </Main>
    )
}

export default AddProject

