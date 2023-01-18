import { useParams } from "react-router-dom";
import Main from '../../containers/Main/Main'
import Bugs from "../../components/Bugs/Bugs";
import { useEffect, useState } from 'react'
import axios from 'axios'
import { getProjectBugs, assignToMe } from "../../utils/requests";

const Bug = (props) => {

    const [bug, setBug] = useState(null)
    const params = useParams()

    useEffect(() => {
        const getProject = async () => {
            if(!params) return
            const response =  await axios({
                method: 'post',
                url: 'http://localhost:3002/api/bug/getBug',
                headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
                data: {id : params.bug_id}
            })
            if(response.status === 500) return
            return setBug(response.data)
        }
        getProject()
    }, [])

    const handleAssignToMe = async () => {
        const response =  await axios({
            method: 'post',
            url: 'http://localhost:3002/api/bug/assignToMe',
            headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
            data: {bug_id : params.bug_id}
        })
        if(response.status === 500) return
        return setBug({...bug, assignedTo: props.data.studentData.email})
    }


    if(!bug) return

    return(
        <Main data={props.data}>
            <div className="w-full px-10 mt-10">

                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="font-bold mt-10 text-2xl my-5 truncate">{bug && bug.description}</h1>
                    </div>     
                    {bug.assignedTo === props.data.studentData.email &&<a className="py-2 px-3 bg-black rounded-md text-white font-bold" href={`/${bug.projectID}/${bug._id}/add-commit`}>Add status update</a> }              
                </div>

                <div className="w-full text-white bg-black p-5 rounded-md flex flex-wrap gap-10">

                    <div className="flex flex-col gap-4">
                        <div className=" flex flex-col">
                            <span>Bug description</span>
                            <span className="font-bold">{bug && bug.description}</span>
                        </div>

                        <div className=" flex flex-col">
                            Repository
                            <span className="font-bold truncate">{bug && bug.repository}</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className=" flex flex-col">
                            <span>Severity</span>
                            <span className="font-bold">{bug && bug.severity}</span>
                        </div>

                        <div className=" flex flex-col">
                            <span>Priority</span>
                            <span className="font-bold">{bug && bug.priority}</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className=" flex flex-col">
                            <span>Status</span>
                            <span className="font-bold">{bug && bug.status}</span>
                            <a href={`/${bug.projectID}/${bug._id}/add-commit`} className="text-blue-500 text-sm">Change status</a>
                        </div>

                        <div className=" flex flex-col">
                            <span>Assigned to</span>
                            <span className="font-bold">{bug && bug.assignedTo}</span>
                            <span onClick={handleAssignToMe} className="text-blue-500 text-sm cursor-pointer">Assign to me</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className=" flex flex-col">
                            <span>Reported by</span>
                            <span className="font-bold">{bug && bug.reporter}</span>
                        </div>

                        <div className=" flex flex-col">
                            <span>Description</span>
                            <span className="font-bold">{bug && bug.description }</span>
                        </div>
                    </div>

                </div>      
            </div>
        </Main>
    )
}

export default Bug