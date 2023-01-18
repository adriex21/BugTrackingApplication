import Main from '../../containers/Main/Main'
import Button from '../../components/Button/Button'
import Teams from '../../components/Teams/Teams'
import { getTeams } from '../../utils/requests'
import { useEffect, useState } from 'react'
import OpenProjects from '../../components/OpenProjects/OpenProjects'
import CurrentlyTesting from '../../components/CurrentlyTesting/CurrentlyTesting'

import { getOpenProjects, getCurrentlyTestingProjects } from '../../utils/requests'

const Dashboard = (props) => {

    const [teamData, setTeamData] = useState([])
    const [openProjectsData, setOpenProjectsData] = useState([])
    const [currentlyTestingData, setCurrentlyTestingData] = useState([])

    useEffect(() => {
        const getData = async () => {
            const res = await getTeams();
            if(res) setTeamData(res)
        }
        getData()
    }, [])


    useEffect(() => {
        const getDataOpenProjects = async () => {
            const res = await getOpenProjects();
            if(res) setOpenProjectsData(res)
        }
        getDataOpenProjects()
    }, [])


    useEffect(() => {
        const getCurrentlyTesting = async () => {
            const res = await getCurrentlyTestingProjects();
            if(res) setCurrentlyTestingData(res)
        }
        getCurrentlyTesting()
    }, [])

    return(
        <Main data={props.data}>
            {props.data.loggedin ? 
                <>
                    <Teams teams={teamData}></Teams>
                    <OpenProjects projects={openProjectsData}></OpenProjects>
                    <CurrentlyTesting projects={currentlyTestingData}></CurrentlyTesting>

                </>
                : 
                <div className="w-full flex justify-center text-white mt-10">
                    <div className="w-auto h-auto bg-[#013a4c] flex flex-col rounded-md p-5 gap-5">
                        <span className="text-2xl font-bold">Seems like you're not logged in :(</span>
                        <span className="text-lg">To view your dashboard please log in</span>
                        <div className="flex gap-4">
                            <Button text="Login" href="/login" color="#008e7e"/>
                            <Button text="Signup" href="/signup" color="#007a6c"/>
                        </div>
                    </div>
                </div>
            }
        </Main>
    )
}

export default Dashboard