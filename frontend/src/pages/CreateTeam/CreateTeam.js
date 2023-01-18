
import Main from '../../containers/Main/Main'

const initialData = {
    teamName: '',
}

const CreateTeam = (props) => {

    return (
        <Main data={props.data}>
            <div className="w-full flex justify-center mt-10">
                <div className="w-[500px] bg-blue-700 rounded-md flex flex-col text-white p-5 gap-3">
                    <h1 className="font-bold text-2xl">Create new team</h1>
                    <h1 className="">Create a new team by adding a name to be form below</h1>

                    <input type="text" className="outline-none h-8 rounded-md"/>

                    <button className="bg-[#171723] w-full text-white h-8 rounded-md text-sm font-bold">
                        Create new team
                    </button>

                </div>
            </div>
        </Main>
    )
}

export default CreateTeam