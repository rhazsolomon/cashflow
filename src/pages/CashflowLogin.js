import { useState } from "react"
import HStack from "../components/HStack"
import VStack from "../components/VStack"
import { signIn } from "../backend/db"
import Cashflow from "./Cashflow"
import { FiUser, FiLock } from "react-icons/fi"
import { FaUser } from "react-icons/fa"
import BounceButton from "../components/BounceButton"







const EmailInput = ({ setValue }) => {
    return (
        <HStack className="px-6 gap-3 py-2 w-full bgbackground-2 rounded-full bg-rhaz-minor-grey text-rhaz-major-grey">
            <FiUser />
            <input
                className="bg-transparent text-black"
                placeholder="email"
                onChange={(e) => setValue(e.target.value)}>
            </input>
        </HStack>

    )
}

const PasswordInput = ({ setValue }) => {
    return (
        <VStack className={'gap-3'}>
            <HStack className="px-6 py-2 w-full bgbackground-2 rounded-full bg-rhaz-minor-grey text-rhaz-major-grey gap-3" >
                <FiLock />
                <input
                    className="bg-transparent focus:border-debug text-black"
                    type="password"
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="password"
                />
            </HStack>
        </VStack>
    )
}
const SignInForm = ({ setUser }) => {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const signInAndSet = async () => {
        const user = await signIn(email, password)
        setUser(user)
    }
    return (

        <form>
            <div className="flex flex-col justify-center items-center gap-5 p-10 text-black">
                <div className="w-20 h-20 bg-red-300 rounded-3xl bg-rhaz-minor-grey flex items-center justify-center text-4xl text-rhaz-major-grey">
                    <FaUser />
                </div>
                <EmailInput setValue={setEmail} />
                <PasswordInput setValue={setPassword} />
                <BounceButton className="bg-rhaz-primary text-white w-1/2 m-2 py-3 rounded-full">
                    <div onClick={(e) => { e.preventDefault(); signInAndSet() }}>Sign In</div>
                </BounceButton>
                <BounceButton>
                    <div className="text-rhaz-major-grey">register</div>
                </BounceButton>
            </div>
        </form>


    )

}

const RegisterForm = ({ setUser }) => {
    return (
        <VStack className='h-full items-center justify-center'>
            <BounceButton
                className='h-auto p-6 bgbackground-2 rounded-2xl border-[1px]'
                onClick={() => {
                    setUser('user_7544046c-49b8-492c-94d4-f9c977e73b95')
                }}
            >
                Use fake account
            </BounceButton>
        </VStack>
    )
}

const WelcomeForm = ({ setUser }) => {
    const [idx, setIdx] = useState(0)


    const TopBit = () => {
        return (
            <div className="flex font-bold bg-rhaz-minor-grey rounded-t-3xl">
                <div
                    className={`w-full p-4 text-center rounded-t-3xl ${idx == 0 ? 'bg-white' : ''}`}
                    onClick={() => { setIdx(0) }}
                >
                    Sign In
                </div>
                <div
                    className={`w-full p-4 text-center rounded-t-3xl ${idx == 1 ? 'bg-white' : ''}`}
                    onClick={() => { setIdx(1) }}
                >
                    Register
                </div>
            </div>
        )
    }

    return (
        <div className="w-screen h-screen bg-rhaz-primary flex items-center justify-center text-rhaz-major-grey">
            <div className=" bg-white rounded-3xl  shadow-xl flex flex-col gap-5 w-1/2 h-[30rem]">
                <TopBit />
                {idx === 0 && (<SignInForm setUser={setUser} />)}
                {idx === 1 && (<RegisterForm setUser={setUser} />)}
            </div>
        </div>
    )
}


const CashflowLogin = () => {
    const [user, setUser] = useState('user_5a5082f0-e649-4170-b1b6-120dc58f6276')

    return (
        <div>
            {!user && <WelcomeForm setUser={setUser} />}
            {user && <Cashflow setUser={setUser}/>}
        </div>
    )

}

export default CashflowLogin;
