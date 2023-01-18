import { useParams } from "react-router-dom";
import Main from '../../containers/Main/Main'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Project = (props) => {

    const [project, setProject] = useState(null)
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
            <div className="w-full px-10 mt-10 text-black">

                <span className="font-bold">{project && project.projectName}</span>

            </div>
        </Main>
    )
}

export default Project