import {useEffect, useState} from 'react'
import axios from 'axios'


const Teams = ({ teams }) => {

    if(!teams) return <span>Loading...</span>
 
    return(
        <div>
            {teams.length > 0 ?
                teams.map(team => (
                    <div key={team} className='px-10 py-5 bg-blue-800 text-white flex justify-between items-center'>
                        <span className='font-bold'>Current team: {team.teamName}</span>
                        <div>
                            <a className='text-black bg-white rounded-md py-2 px-3 font-bold' href='/create-team'>
                                Manage team
                            </a>
                        </div>
                        
                    </div>
                ))
                :
                <div className='px-10 py-5 bg-blue-800 text-white flex justify-between items-center'>
                    <span className='font-bold'>You have no team</span>
                    <a className='text-black bg-white rounded-md py-2 px-3 font-bold' href='/create-team'>
                        Create a team
                    </a>
                </div>
            }
            
        </div>
    )

}

export default Teams