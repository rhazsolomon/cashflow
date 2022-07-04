import { FaUser } from "react-icons/fa";
import BounceButton from "./BounceButton";
import HStack from "./HStack";


const CashflowUserInfo = ({user, setUser}) => {
    console.log(user, "CashflowUserInfo")
    return (
        <HStack 
            className="w-min whitespace-nowrap gap-2 p-3"
        >
            <FaUser /> 
            <BounceButton onClick={() => setUser(null)} className='flex gap-2'>
                {user.name}
                {user.isTestUser && (
                    <div className="rounded bg-primary px-2">
                        Test User
                    </div>
                )}
            </BounceButton>        
        </HStack>
    )
}

export default CashflowUserInfo;