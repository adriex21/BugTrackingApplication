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
          const response = await getTeamProjects(params.id)
          if(response){
            setProjects(response.data.projects)
          }
        }
        getProjects()
    }, [])

    return(
        <Main data={props.data}>

            {params.id}

            {projects }
        </Main>
    )
}

export default TeamProjects