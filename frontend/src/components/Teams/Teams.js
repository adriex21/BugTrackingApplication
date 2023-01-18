import {useEffect, useState} from 'react'
import axios from 'axios'


const Teams = ({ teams }) => {

    return(
        <div>
            {teams.length > 0 ?
                teams && teams.map(team => (
                    <span key={team.teamName}>{team.teamName}</span>
                    ))
                :
                <div className='p-5 bg-blue-800 text-white flex justify-between'>
                    <span className='font-bold'>You have no team</span>
                </div>
            }
            
        </div>
    )

}

export default Teams