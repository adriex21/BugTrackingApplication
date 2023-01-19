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


export const getProjectBugs = async (projectID) => {
    try{
        const response = await axios({
            method: 'POST',
            url: 'http://localhost:3002/api/bug/getBugsProject',
            headers: { 
                "Authorization": "Bearer " + localStorage.getItem("token"),
                'Content-Type': 'application/json' 
            },
            data: JSON.stringify({ id: projectID })
        })
        if(response.status === 500) return null
        return response
    }catch(err){
        console.log(err.response.data.msg)
    }
}

export const getCurrentlyTestingProjects = async () => {
    try{
        const response = await axios({
            method: 'get',
            url: 'http://localhost:3002/api/student/getCurrentlyTestingProjects',
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

// export const addMembers = async (student_id) => {
//     try{
//         const response = await fetch('http://localhost:3002/api/team/addMembers', {
//             method: 'POST',
//             headers: { 
//                 "Authorization": "Bearer " + localStorage.getItem("token"),
//                 'Content-Type': 'application/json' 
//             },
//             body: JSON.stringify(student_id)
//         })
//         if(response.status === 500) return null
//         return response
//     }catch(err){
//         console.log(err)
//     }
// }

export const createBug = async (payload) => {
    try{
        const response = await fetch('http://localhost:3002/api/bug/add', {
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


export const assignToMe= async (bug_id) => {
    try{
        const response = await fetch({
            method: 'post',
            url: 'http://localhost:3002/api/bug/assignToMe',
            headers: { 
                "Authorization": "Bearer " + localStorage.getItem("token"),
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({bug_id : bug_id})
        })
        if(response.status === 500) return null
        return response
    }catch(err){
        console.log(err.response.data.msg)
    }
}

export const addCommit = async(payload) => {
    try{
        const response = await axios('http://localhost:3002/api/bug/addCommit', {
            method: 'post',
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(payload)
        })
        if(response === 500) return null
        return response
     
    } catch(err){
        console.log(err)
    }
}

export const getTeamProjects = async (teamName) => {
    try{
        const response = await axios({
            method: 'POST',
            url: 'http://localhost:3002/api/team/getTeamProjects',
            headers: { 
                "Authorization": "Bearer " + localStorage.getItem("token"),
                'Content-Type': 'application/json' 
            },
            data: JSON.stringify({ teamName: teamName })
        })
        if(response.status === 500) return null
        return response
    }catch(err){
        console.log(err.response.data.msg)
    }
}

export const createProject = async (payload) => {
    try{
        const response = await fetch('http://localhost:3002/api/project/add', {
            method: 'POST',
            headers: { 
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(payload)
        })
        if(response.status === 500) return null
        return response
    }catch(err){
        console.log(err)
    }
}

export const joinAsTester = async (projectID) => {
    try{
        const response = await fetch({
            method: 'post',
            url: 'http://localhost:3002/api/project/joinAsTester',
            headers: { 
                "Authorization": "Bearer " + localStorage.getItem("token"),
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({id : projectID})
        })
        if(response.status === 500) return null
        return response
    }catch(err){
        console.log(err.response.data.msg)
    }
}

export const SignUp = async (payload) => {
    try{
        const response = await fetch('http://localhost:3002/api/student/register', {
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
        return []
    }
}