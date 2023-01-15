
const Header = (props) => {
    return(
        <div className="bg-[#171723] w-full h-20 flex items-center px-10 justify-between">

            <span className="text-white text-2xl font-bold">Bug tracker</span>

            <div>
                {props.data.loggedin ? <span className="text-white">Hello, {props.data.studentData.name}</span>
                    : 
                    <div className="flex flex-col gap-1 text-white text-md">
                        <span>You are not logged in </span>
                        <span><a className="font-bold" href="/login">login</a> or <a className="font-bold" href="/signup">signup</a></span>
                    </div>
                }
            </div>

        </div>
    )
}

export default Header