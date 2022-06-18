const HStack = (props) => {
    return (
        <div style={props.style} onClick={props.onClick} className={`${props.className} ${props.debug ? 'bg-green-200' : ''} flex flex-row items-center h-auto w-auto`}>
            {props.children}
        </div>
    )
}

export default HStack;