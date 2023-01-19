
import { joinAsTester } from "../../utils/requests";
import axios from 'axios'

const OpenProject = ({projects}) => {

    const handleRegisterTester = async (id) => {
        const response =  await axios({
            method: 'post',
            url: 'http://localhost:3002/api/project/joinAsTester',
            headers: { 
                "Authorization": "Bearer " + localStorage.getItem("token"),
            },
            data: {id : id}
        })
        if(response.status === 500) return null
        return window.location.href = '/'
    }

    if(projects && projects === 'No projects could be found'){ return <span>No projects found</span>}
    return (
        <div className="px-10 mt-10 ">

            <h1 className="font-bold text-2xl ">Tester open projects</h1>
            <span>Below are projects that you are not a member of but can register to submit bugs for.</span>
  
            <ul className="flex flex-col gap-4 mt-10">

                {projects.length === 0 && <span>No open tester projects found</span>}

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
                                 
                                 <button onClick={() => (handleRegisterTester(project._id))} className='text-white border-2 border-white rounded-md py-2 px-3 font-bold'>
                                     Register as tester
                                 </button>
                             </div>
                         </div>      
                     </li>
                ))}
            </ul>
        </div>
    )
}

export default OpenProject