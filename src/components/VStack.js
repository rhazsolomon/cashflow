const VStack = (props) => {
    return (
        <div className={`${props.className} ${props.debug ? 'bg-green-200' : ''} flex flex-col w-auto h-auto  `} onMouseEnter={props.onMouseEnter}>
            {props.children}
        </div>
    )
}

export default VStack;