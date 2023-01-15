import Button from '../../components/Button/Button'
import Main from '../../containers/Main/Main'

const Login = (props) => {
    return(
        <Main>
            {props.loggedIn ? 
                <div></div>
                : 
                <div className="w-full flex justify-center text-white mt-10">
                    <div className="w-auto h-auto bg-[#013a4c] flex flex-col rounded-md p-5 gap-5">
                        <span className="text-2xl font-bold">Seems like you're not logged in .....</span>
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

export default Login

