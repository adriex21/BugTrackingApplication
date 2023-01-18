



const OpenProject = ({projects}) => {

    if(projects && projects === 'No projects could be found'){ return <span>No projects found</span>}
    return (
        <div>
            {projects.map(project => (
                <ul>
                    <li>{project.name}</li>
                </ul>
            ))}
        </div>

    )
}

export default OpenProject