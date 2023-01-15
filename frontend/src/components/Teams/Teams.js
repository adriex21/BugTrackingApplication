import {useEffect, useState} from 'react'

const getTeamData = () => {
    return fetch('http://localhost:3002/api/student/getMyTeams', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    }).then(data => data.json())
}

const initialData = {
    test: 'test',
    testData: []
}

const Teams = (props) => {

    const [teamData, setTeamData] = useState([])

    useEffect(() => {
        let mounted = true;
        getTeamData()
        .then(data => {
            console.log(data)
            if(mounted){
                setTeamData({...teamData, testData: data})
            }
        })
        return () => mounted = false;
    }, [])


    useEffect(() => {setTeamData(teamData)}, [teamData])

    return(
        <div>
            test
            {teamData.testData && teamData.testData.map(team => {
                <span className="text-black">{team.teamName}</span>
            })}
        </div>
    )

}

export default Teams