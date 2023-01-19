import Main from '../../containers/Main/Main'
import { useState, useEffect } from 'react';
import { SignUp } from '../../utils/requests'


const initialData = {
    name:'', 
    email:'',
    password:'', 
    password2:''
}

const RegisterMember = (props) => {

    const [signUp, setSignUp] = useState(initialData)
    const [errors, setErrors] = useState([])

    const handleSignUp = async () => {
        const response = await SignUp(signUp)
        if(response){ return window.location.href = '/' }
        return setErrors(['Something went wrong'])
    }

    return (
        <Main data={props.data}>
            <div className="w-full flex justify-center mt-10">
                <div className="w-[500px] bg-[#013a4c] rounded-md flex flex-col text-white p-5 gap-3">
                    <h1 className="font-bold text-2xl">Sign up</h1>
                
                    {errors.map(error => (
                        <span key={error} className="text-red-500">{error}</span>
                    ))}

                    <label for="fname">Name</label>
                    <input
                    value={signUp.name || ''}
                    onChange={(e) => {setSignUp({...signUp,name: e.target.value})}}
                    type="text" className="outline-none h-8 rounded-md text-black"/>
                    <label for="fname">Email</label>
                    <input
                    value={signUp.email || ''}
                    onChange={(e) => {setSignUp({...signUp,email: e.target.value})}}
                    type="text" className="outline-none h-8 rounded-md text-black"/>
                    <label for="fname">Password</label>
                    <input
                    value={signUp.password || ''}
                    onChange={(e) => {setSignUp({...signUp, password: e.target.value})}}
                    type="password" className="outline-none h-8 rounded-md text-black"/>
                    <label for="fname">Confirm password</label>
                    <input
                    value={signUp.password2 || ''}
                    onChange={(e) => {setSignUp({...signUp, password2: e.target.value})}}
                    type="password" className="outline-none h-8 rounded-md text-black"/>

                    <button onClick={handleSignUp} className="bg-[#008e7e] w-full text-white h-8 rounded-md text-sm font-bold">
                        Register now
                    </button>

                </div>
            </div>
        </Main>
    )
}

export default RegisterMember