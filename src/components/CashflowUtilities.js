import { FaUtensils } from "react-icons/fa";
import { deleteTransactions } from "../backend/db";
import {createRandomTransactions} from "../backend/backend"

import BounceButton from "./BounceButton";
import HStack from "./HStack";
import VStack from "./VStack";

const CashflowUtilities = ({allTransactions, setAllTransactions}) => {


    
    return (
        <VStack className="m-3 p-3 border-[1px] border-orange-500 rounded-lg h-auto w-auto">
            <HStack className="h-auto w-auto gap-3 ">
                <FaUtensils />
                Utilities
            </HStack>
            <BounceButton onClick={ () => deleteTransactions(allTransactions.map(a => a.id))}>
                Delete all transactions
            </BounceButton>
            <BounceButton onClick={createRandomTransactions}>
                Create random transactions
            </BounceButton>
            
        </VStack>
        
    )
}

export default CashflowUtilities;