import BounceButton from "../BounceButton"

const Button = ({onClick, children}) => {
    return (
        <BounceButton onClick={onClick}>
            {children}
        </BounceButton>
    )
}

export default Button;