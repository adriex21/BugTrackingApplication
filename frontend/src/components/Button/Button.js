const Button = (props) => {
    return (

        <a className={`px-2 py-2 rounded-md bg-[${props.color}]`}href={props.href}>
            {props.text}
        </a>
    )
}
export default Button