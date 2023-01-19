import {useEffect, useState} from 'react'
import axios from 'axios'


const Teams = ({ teams }) => {

    if(!teams) return <span>Loading...</span>
 
    return(
        <div>
            {teams.length > 0 ?
                teams.map(team => (
                    <div key={team} className='px-10 py-5 bg-blue-800 w-1/2 mr-auto ml-auto my-10 rounded-md text-white flex justify-between items-center'>
                        <span className='font-bold'>Current team: {team.teamName}</span>
                        <div className='flex gap-3'>
                            <a href={`/${team.teamName}/addMembers`} className='text-black bg-white rounded-md py-2 px-3 font-bold'>
                                Add Members
                            </a>
                            <a href={`/${team.teamName}/projects`} className='text-black bg-white rounded-md py-2 px-3 font-bold'>
                                View projects
                            </a>
                        </div>
                    </div>
                ))
                :
                <div className='px-10 py-5 bg-blue-800 w-1/2 mr-auto ml-auto my-10 rounded-md text-white flex justify-between items-center'>
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