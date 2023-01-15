import Header from '../../components/Header/Header'

const Main = (props) => {
    return(
        <div className="w-[100vw]">
            <Header></Header>
            {props.children}
        </div>
    )
}

export default Main