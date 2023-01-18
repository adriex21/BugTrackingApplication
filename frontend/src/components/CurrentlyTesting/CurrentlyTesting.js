import { joinAsTester } from "../../utils/requests";
import axios from 'axios'

const CurrentlyTesting = ({projects}) => {

    if(projects && projects === 'No projects could be found'){ return <span>No projects found</span>}
    return (
        <div className="px-10 mt-10">

            <h1 className="font-bold text-2xl">Currently testing</h1>
            <span>Below are projects that you are not a member of but are currently a tester for.</span>
  
            <ul className="flex flex-col gap-4 mt-10">

                {projects.length === 0 && <span>You're not currently testing any projects.</span>}

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
                                 
                                 <a href='/' className='text-white border-2 border-white rounded-md py-2 px-3 font-bold'>
                                     View
                                 </a>
                             </div>
                         </div>      
                     </li>
                ))}
            </ul>
        </div>
    )
}

export default CurrentlyTesting