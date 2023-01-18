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
                <div className='px-10 py-5 bg-blue-800 text-white flex justify-between'>
                    <span className='font-bold'>You have no team</span>

                    <a href='/create-team'>
                        
                    </a>
                </div>
            }
            
        </div>
    )

}

export default Teams