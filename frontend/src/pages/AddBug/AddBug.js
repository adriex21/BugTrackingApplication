
import Main from '../../containers/Main/Main'
import { useState, useEffect } from 'react';
import { createTeam } from '../../utils/requests'


const initialData = {
    teamName: '',
}

const AddBug = (props) => {

    const [team, setTeam] = useState(initialData)
    const [errors, setErrors] = useState([])

    const handleCreateTeam = async () => {
        const response = await createTeam(team)
        if(response){ return window.location.href = '/' }
        return setErrors(['Something went wrong'])
    }

    return (
        <Main data={props.data}>
            <div className="w-full flex justify-center mt-10">
                <div className="w-[500px] bg-blue-700 rounded-md flex flex-col text-white p-5 gap-3">
                    <h1 className="font-bold text-2xl">Create new team</h1>
                    <h1 className="">Create a new team by adding a name to be form below</h1>

                    {errors.map(error => (
                        <span key={error} className="text-red-500">{error}</span>
                    ))}

                    <input
                    placeholder='Team name'
                    value={team.teamName || ''}
                    onChange={(e) => {setTeam({teamName: e.target.value})}}
                    type="text" className="outline-none h-8 rounded-md text-black"/>

                    <button onClick={handleCreateTeam} className="bg-[#171723] w-full text-white h-8 rounded-md text-sm font-bold">
                        Create new team
                    </button>

                </div>
            </div>
        </Main>
    )
}

export default AddBug