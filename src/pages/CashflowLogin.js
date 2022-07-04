import { useState } from "react"
import VStack from "../components/VStack"
import { signIn } from "../backend/db"
import Cashflow from "./Cashflow"
import BounceButton from "../components/BounceButton"
import FriendlyGraphic from "../components/FriendlyGraphic"
import Button from "../components/base/Button"
import Input from "../components/base/Input"
import { createUser } from "../backend/backend"


const SignInForm = ({ setUser }) => {
    const [email, setEmail] = useState("rhaz.solomon@gmail.com")
    const [password, setPassword] = useState("2252B87F-47EB-4816-A844-736941640203")
    const onClick = async () => {
        let user = await signIn(email, password)
        setUser(user.id)
    }
    return (
        <div className="flex flex-col justify-center items-center text-black gap-2">
            <Input type={'email'} value={email} setValue={setEmail} />
            <Input type={'password'} value={password} setValue={setPassword} />
            <Button onClick={onClick}>
                Sign In
            </Button>
        </div>
    )
}

const RegisterForm = ({ setUser }) => {
    const [fullName, setFullName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const onClick = async () => {
        const user = await createUser(fullName, email, password)
        console.log(user.id, "here")
        setUser(user.id)
    }
    return (
        <VStack className='h-full '>
            <Input type={'text'} value={fullName} setValue={setFullName}/>
            <Input type={'email'} value={email} setValue={setEmail}/>
            <Input type={'password'} value={password} setValue={setPassword}/>
            <Input type={'password'} value={confirmPassword} setValue={setConfirmPassword}/>
            <Button onClick={onClick}>Register</Button>
            <BounceButton
                className='h-auto p-6  border-[1px] bg-primary px-10 py-3 text-foreground-1 rounded-full'
                onClick={async () => {
                    let user = await signIn("test-user@test.com", "123456")
                    setUser(user.id)
                }}
            >
                Use fake account
            </BounceButton>
        </VStack>
    )
}


const TopBit = ({idx, setIdx}) => {
    return (
        <div className="flex font-bold bg-background-3 rounded-full border-[1px] w-1/2 border-background-3 text-foreground-2  gap-4 whitespace-nowrap">
            <div
                className={`w-full text-center rounded-full ${idx == 0 ? 'bg-background-1 text-foreground-1' : ''}`}
                onClick={() => { setIdx(0) }}
            >
                Sign In
            </div>
            <div
                className={`w-full align-middle m-auto text-center rounded-full ${idx == 1 ? 'bg-background-1 text-foreground-1' : ''}`}
                onClick={() => { setIdx(1) }}
            >
                Register
            </div>
        </div>
    )
}

const WelcomeForm = ({ setUser }) => {
    const [idx, setIdx] = useState(0)

    return (
        <div className="w-screen h-screen bg-background-2 flex items-center justify-center text-rhaz-major-grey">
            <div className=" bg-background-1 rounded-3xl  shadow-xl flex flex-col w-2/3 h-2/3 border-[1px] border-background-3 items-center p-5 gap-2">
                <TopBit idx={idx} setIdx={setIdx}/>
                <FriendlyGraphic className={'h-full'}/>
                {idx === 0 && (<SignInForm setUser={setUser} />)}
                {idx === 1 && (<RegisterForm setUser={setUser} />)}
            </div>
        </div>
    )
}


const CashflowLogin = () => {
    const [user, setUser] = useState(null)

    return (
        <div>
            {!user && <WelcomeForm setUser={setUser} />}
            {user && <Cashflow user={user} setUser={setUser}/>}
        </div>
    )

}

export default CashflowLogin;
