import { useParams } from "react-router-dom";
import Main from '../../containers/Main/Main'
import { useEffect, useState } from 'react'
import { getTeamProjects } from '../../utils/requests'


const TeamProjects = (props) => {

    const [projects, setProjects] = useState([])
    const params = useParams();

    useEffect(()=> {
        const getProjects = async () =>{
          if(!params) return
          const response = await getTeamProjects(params.teamName)
          if(response){
            setProjects(response.data)
          }
        }
        getProjects()
    }, [])

    return(
        <Main data={props.data}>

            <div className="w-1/2 mr-auto ml-auto my-10 rounded-md w-full h-16 bg-blue-900 px-10 flex items-center justify-between">
                <span className="text-white font-bold">Projects for team {params.teamName}</span>
                <a href={`/${params.teamName}/add-project`} className="text-black bg-white rounded-md py-2 px-3 font-bold">
                    Add project
                </a>
            </div>

            {projects && projects.length > 0 ?
                <ul className="px-10 flex flex-col gap-4 mt-10">
                    {projects.map(project => (       
                            <li key={project.projectName}>
                                <div className="bg-black h-16 text-white rounded-md flex justify-between items-center px-4">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-xs">Project name</span> 
                                        {project.projectName} 
                                    </div>

                                    <div className="flex gap-5">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-xs">Members</span> 
                                            {project.projectMembers.length} 
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-xs">Bugs</span> 
                                            {project.bugs.length} 
                                        </div>
                                        <a href={`/${project._id}/view`} className='text-white border-2 border-white rounded-md py-2 px-3 font-bold'>
                                            View
                                        </a>
                                        
                                    </div>
                                </div>      
                            </li>
                    ))}
                </ul>
                :
                <div className="px-10 mt-10 flex gap-3 items-center">
                    No projects added for this team

                    <a href={`/${params.teamName}/add-project`} className="text-white bg-black rounded-md py-2 px-3 font-bold w-auto">
                        Add a first project
                    </a>
                </div>
            }
        </Main>
    )
}

export default TeamProjects