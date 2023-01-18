import axios from 'axios'

export const getTeams = async () => {
    try{
        const response = await axios({
            method: 'get',
            url: 'http://localhost:3002/api/student/getMyTeams',
            headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
        });
        console.log(response.data)
        return response.data
    }catch(err){
        console.log(err)
        return []
    }
}

export const getOpenProjects = async () => {
    try{
        const response = await axios({
            method: 'get',
            url: 'http://localhost:3002/api/student/getOpenProjects',
            headers: { 
                "Authorization": "Bearer " + localStorage.getItem("token") }
        });
        console.log(response.data)
        return response.data
    }catch(err){
        console.log(err)
    }
}

export const createTeam = async (payload) => {
    try{
        const response = await fetch('http://localhost:3002/api/team/add', {
            method: 'POST',
            headers: { 
                "Authorization": "Bearer " + localStorage.getItem("token"),
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(payload)
        })
        if(response.status === 500) return null
        return response
    }catch(err){
        console.log(err)
    }
}

export const getTeamProjects = async (teamID) => {
    try{
        const response = await axios({
            method: 'POST',
            url: 'http://localhost:3002/api/team/getTeamProjects',
            headers: { 
                "Authorization": "Bearer " + localStorage.getItem("token"),
                'Content-Type': 'application/json' 
            },
            data: JSON.stringify({ id: teamID })
        });
        if(response.status === 500) return null
        return response
    }catch(err){
        console.log(err.response.data.msg)
    }
}