import { FaUser } from "react-icons/fa";
import BounceButton from "./BounceButton";
import HStack from "./HStack";


const CashflowUserInfo = ({userId, setUser}) => {
    return (
        <HStack className=" h-auto gap-4 w-auto text-white p-3 border-[1px] rounded-lg m-3 border-green-700">
            <FaUser />
            <BounceButton onClick={() => setUser(null)}>
                {userId}
            </BounceButton>
            
        </HStack>
    )
}

export default CashflowUserInfo;