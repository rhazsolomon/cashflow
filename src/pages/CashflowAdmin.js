import { useState } from "react";
import BounceButton from "../components/BounceButton";
import { v4 as uuidv4 } from 'uuid';
import VStack from "../components/VStack";

const CreateNewUserSection = () => {
    const [name, setName] = useState()

    return (
        <VStack className='w-80 bgbackground-2 p-5 gap-2'>
            
        </VStack>
    )
}
const CashflowAdmin = () => {
    return (
        <div className="p-10 flex flex-col gap-2">
            <CreateNewUserSection />
        </div>
    )
}


export default CashflowAdmin;