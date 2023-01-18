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
            setProjects(response.data.projects)
          }
        }
        getProjects()
    }, [])

    return(
        <Main data={props.data}>

            <div className="w-full h-16 bg-blue-900 px-10 flex items-center justify-between">
                <span className="text-white font-bold">Projects for team {params.teamName}</span>
                <a href={`/${params.teamName}/add-project`} className="text-black bg-white rounded-md py-2 px-3 font-bold">
                    Add project
                </a>
            </div>

            {projects && projects.length > 0 ?
                projects.map(project => (
                    <ul>
                        <li>{project}</li>
                    </ul>
                ))
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