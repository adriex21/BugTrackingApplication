import { useParams } from "react-router-dom";
import Main from '../../containers/Main/Main'
import Bugs from "../../components/Bugs/Bugs";
import { useEffect, useState } from 'react'
import axios from 'axios'

const Project = (props) => {

    const [project, setProject] = useState(null)
    const [bugs, setBugs] = useState(null)
    const params = useParams()

    useEffect(() => {
        const getProject = async () => {
            if(!params) return
            const response =  await axios({
                method: 'post',
                url: 'http://localhost:3002/api/project/getProject',
                headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
                data: {id : params.project_id}
            })
            if(response.status === 500) return
            console.log(response)
            return setProject(response.data)
        }
        getProject()
    }, [])

    if(!project) return


    return(
        <Main data={props.data}>
            <div className="w-full px-10 mt-10">

                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="font-bold mt-10 text-2xl">{project && project.projectName}</h1>
                        <h2 className="mb-5">View, add and modify the bugs of {project && project.projectName}</h2>
                    </div>
                    {!project.projectMembers.includes(props.data.studentData.id) && <div>
                        <a href={`/${params.project_id}/add-bug`} className="bg-black py-2 px-3 font-bold rounded-md text-white">Add bug</a>
                    </div>}
                    
                </div>

                <div className="w-full text-white bg-black p-5 rounded-md flex gap-10">

                    <div className="flex flex-col gap-4">
                        <div className=" flex flex-col">
                            <span>Project name</span>
                            <span className="font-bold">{project && project.projectName}</span>
                        </div>

                        <div className=" flex flex-col">
                            Repository
                            <span className="font-bold">{project && project.repository}</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className=" flex flex-col">
                            <span>Bugs</span>
                            <span className="font-bold">{project && project.bugs.length}</span>
                        </div>

                        <div className=" flex flex-col">
                            <span>Members</span>
                            <span className="font-bold">{project && project.projectMembers.length}</span>
                        </div>
                    </div>

                    
                    <div className="flex flex-col gap-4">
                        <div className=" flex flex-col">
                            <span>Current team</span>
                            <span className="font-bold">{project && project.team}</span>
                        </div>

                        <div className=" flex flex-col">
                            <span>Your permissions</span>
                            <span className="font-bold">{project && project.projectMembers.includes(props.data.studentData.id) ? 'You are a member of this project' : 'You are registered as a tester of this project'}</span>
                        </div>
                    </div>


                </div>

                <h1 className="font-bold mt-10 text-2xl">Project bugs</h1>
                <h2 className="mb-5">Browse the added bugs of {project && project.projectName}</h2>

                <Bugs>

                </Bugs>
            
            </div>
        </Main>
    )
}

export default Project