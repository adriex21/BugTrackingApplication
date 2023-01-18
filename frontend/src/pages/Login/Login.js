import Button from '../../components/Button/Button'
import Main from '../../containers/Main/Main'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'

const Login = (props) => {
    const initialData = {
        email: '',
        password: '',
    }
    const [loginData, setLoginData] = useState(initialData)

    const handleLogin = async () => {
        const response = await fetch('http://localhost:3002/api/student/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData)
        })
        try {
            const received = await response.json();
            if(response.status !== 200) return
            localStorage.setItem('token', received.token)
            document.location.href = '/'
            return received;
        }
        catch(error) {
            console.log('ERROR: '+ error);
        }
    }

    return(
        <Main data={props.data}>
            {props.data.loggedin ? 
                <Navigate to={'/'}></Navigate>
                : 
                <div className="w-full flex justify-center text-white mt-10">
                    <div className="w-auto h-auto bg-[#013a4c] flex flex-col rounded-md p-5 gap-5">
                        <span className="text-2xl font-bold">Login</span>
                        <span className="text-md">Log in with an existing account for Bug Tracker</span>

                        <div className='flex flex-col gap-4'>
                            <label for="fname">Email</label>
                            <input value={loginData.email || ''} 
                            onChange={(e) => {
                                setLoginData({...loginData, email: e.target.value})
                            }}
                            className='h-8 rounded-md text-black' type="text" id="fname" name="fname"/>
                        </div>

                        <div className='flex flex-col gap-4'>
                            <span for="fname">Password</span>
                            <input value={loginData.password || ''} 
                            onChange={(e) => {
                                setLoginData({...loginData, password: e.target.value})
                            }}
                            className='h-8 rounded-md text-black m-0' type="password" id="fname" name="fname"/>
                        </div>

                        <div className="flex gap-4">
                            <button onClick={handleLogin} className="cursor-pointer px-2 py-2 rounded-md bg-[#008e7e] w-full">Login</button>
                        </div>

                        <span className='text-sm'>
                            Don't have an account? <a className='font-bold' href='/signup'>Signup</a>
                        </span>
                    </div>
                </div>
            }
        </Main>
    )
}

export default Login

