
const Bugs = ({bugs, user, project}) => {

    if(!bugs) return

    return (
        <ul className="flex flex-col gap-4 mt-10">

                {bugs.length === 0 && <span>No open tester projects found</span>}

                {bugs.map(bug => (
                         <li key={bug.description}>
                         <div className="bg-black h-16 text-white rounded-md flex justify-between items-center px-4">
                             <div className="flex flex-col">
                                 <span className="font-bold text-xs">Description</span> 
                                 {bug.description} 
                             </div>

                             <div className="flex flex-row gap-5 h-auto">

                                    {bug.status === 'Open' &&
                                        <span className="bg-green-500 text-sm flex items-center font-bold px-3 rounded-md">{bug.status}</span> 
                                        ||
                                    bug.status === 'Fixed' &&
                                        <span className="bg-red-500 text-sm flex items-center font-bold px-3 rounded-md">{bug.status}</span>
                                        ||
                                    bug.status === 'In-Progress' &&
                                        <span className="bg-yellow-500 text-sm flex items-center font-bold px-3 rounded-md">{bug.status}</span>
                                    }
                                    <div className="bg-white text-sm flex items-center font-bold px-3 rounded-full text-black">{bug.severity}</div>
                                    <div className="bg-white text-sm flex items-center font-bold px-3 rounded-full text-black">{bug.priority}</div>

                                 {project.projectMembers.includes(user.studentData._id) && <a href={`/${bug._id}/view-bug`} className='text-white border-2 border-white rounded-md px-3 font-bold'>
                                     View
                                 </a>}
                             </div>
                         </div>      
                     </li>
                ))}
            </ul>
    )
}

export default Bugs