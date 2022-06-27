import { FaFile } from "react-icons/fa"
import {processBankFile} from "../backend/backend"
import HStack from "./HStack"

const TransactionsFileInput = ({ setAllTransactions }) => {
    async function handleFileInput(e) {
        
        const allNewTransactions = await processBankFile(e.target.files[0])
        setAllTransactions(allNewTransactions)
    }
    return (
        <HStack className={"gap-2 w-min  mr-auto"}>
            <FaFile />
            <input  
                type={'file'} 
                onChange={handleFileInput} 
                
            />
        </HStack>
        
    )
}

export default TransactionsFileInput;