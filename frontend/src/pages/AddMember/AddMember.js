import { useParams } from "react-router-dom";
import Main from '../../containers/Main/Main'
import { useEffect, useState } from 'react'
import { addMembers } from '../../utils/requests'


const initialData = {
    teamMembers: ''
}


const AddMember = (props) => {
    const [team, setTeam] = useState(initialData)
    const [errors, setErrors] = useState([])
    const params = useParams();



    const handleAddMember = async () => {
        if(team.teamMembers === '') return setErrors(['Please fill all fields'])
        team.teamMembers = params.teamMembers;
        const response = await addMembers(team)
        if(response){ return window.location.href = `/` }
        return setErrors(['Something went wrong'])
    }

    return (
        <Main data={props.data}>
            <div className="w-full flex justify-center mt-10">
                <div className="w-[500px] bg-black rounded-md flex flex-col text-white p-5 gap-3">

                    <h1 className="font-bold text-2xl">Add new member</h1>

                    {errors.map(error => (
                        <span key={error} className="text-red-500">{error}</span>
                    ))}

                    <input
                    placeholder='Email'
                    value={team.teamMembers || ''}
                    onChange={(e) => {setTeam({...team, teamMembers: e.target.value})}}
                    type="text" className="outline-none h-8 rounded-md text-black px-2"/>


                    <button onClick={handleAddMember} className="bg-black border-2 border-white w-full text-white h-8 rounded-md text-sm font-bold">
                        Add memeber
                    </button>

                </div>
            </div>
        </Main>
    )
}
export default AddMember

