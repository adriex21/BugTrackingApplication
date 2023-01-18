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
            headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
        });
        console.log(response.data)
        return response.data
    }catch(err){
        console.log(err)
    }
}

export const createTeam = async (payload) => {
    try{
        const response = await axios({
            method: 'post',
            url: 'http://localhost:3002/api/team/add',
            body: payload,
            headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
        });
        console.log(response.data)
        return response.data
    }catch(err){
        console.log(err)
    }
}