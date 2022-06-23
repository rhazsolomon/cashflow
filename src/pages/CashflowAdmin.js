import { useState } from "react";
import BounceButton from "../components/BounceButton";
import { createNewUserWithDefaults } from "../backend/db";
import { v4 as uuidv4 } from 'uuid';
import VStack from "../components/VStack";

const CreateNewUserSection = () => {
    const [name, setName] = useState()

    return (
        <VStack className='w-80 bgbackground-2 p-5 gap-2'>
            <input className="p-2" type={'text'} placeholder={'name'} onChange={(e) => setName(e.target.value)} />
            <BounceButton
                className='bgbackground-2 p-2'
                onClick={async () => {
                    const id = await createNewUserWithDefaults(name, `${uuidv4()}@test.com`)
                    alert(id)
                }}
            >
                Create Fake User
            </BounceButton>
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