import { useParams } from "react-router-dom";
import { useLayoutEffect, useState } from 'react'
import { joinAsTester } from "../../utils/requests";


const RegisterTester = (props) => {

    const params = useParams()

    const joinTester = async () => {
        const response = await joinAsTester(params.id)
        console.log(response)
        //if(response) return window.location.href = '/'
    }
    joinTester()
    return (<div>

    </div>)
}

export default RegisterTester