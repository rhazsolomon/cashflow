import { useState } from "react"
import HStack from "../components/HStack"
import VStack from "../components/VStack"
import { signIn } from "../backend/db"
import Cashflow from "./Cashflow"
import { FiUser, FiLock } from "react-icons/fi"
import { FaUser } from "react-icons/fa"
import BounceButton from "../components/BounceButton"
import FriendlyGraphic from "../components/FriendlyGraphic"







const EmailInput = ({ setValue }) => {
    return (
        <HStack className="px-6 gap-3 py-2 w-full bg-background-2 rounded-full border-background-3   border-[1px] text-foreground-1">
            <FiUser className="text-foreground-2"/>
            <input
                className="bg-transparent placeholder:text-foreground-2"
                placeholder="email"
                onChange={(e) => setValue(e.target.value)}>
            </input>
        </HStack>

    )
}

const PasswordInput = ({ setValue }) => {
    return (
        <HStack className="px-6 py-2 w-full bg-background-2 rounded-full border-background-3 border-[1px] gap-3 text-foreground-1" >
            
            <FiLock className="text-foreground-2"/>
            <input
                className="bg-transparent focus:border-debug  placeholder:text-foreground-2"
                type="password"
                onChange={(e) => setValue(e.target.value)}
                placeholder="password"
            />
        </HStack>
    
    )
}
const SignInForm = ({ setUser }) => {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const signInAndSet = async () => {
        const user = await signIn(email, password)
        setUser(user.id)
    }
    return (

        <form className="h-full">
            <div className="flex flex-col   justify-center items-center  text-black gap-2">
                <EmailInput setValue={setEmail} />
                <PasswordInput setValue={setPassword} />
                <HStack className="gap-6 m-6">
                    <BounceButton>
                        <div className="text-foreground-2">register</div>
                    </BounceButton>
                    <BounceButton className="bg-primary px-10 py-3 text-foreground-1 rounded-full">
                        <div onClick={(e) => { e.preventDefault(); signInAndSet() }}>Sign In</div>
                    </BounceButton>
            
                </HStack>
                
            </div>

        </form>
            
        


    )

}

const RegisterForm = ({ setUser }) => {
    return (
        <VStack className='h-full '>
            
            <BounceButton
                className='h-auto p-6  border-[1px] bg-primary px-10 py-3 text-foreground-1 rounded-full'
                onClick={async () => {
                    console.log("Hello world")
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
            {user && <Cashflow setUser={setUser}/>}
        </div>
    )

}

export default CashflowLogin;
