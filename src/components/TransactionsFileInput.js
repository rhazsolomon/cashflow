import { FaFile } from "react-icons/fa"
import backend from "../backend/backend"
import HStack from "./HStack"

const TransactionsFileInput = ({ setAllTransactions }) => {
    async function handleFileInput(e) {
        const allNewTransactions = await backend.processBankFile(e.target.files[0])
        setAllTransactions(allNewTransactions)
    }
    return (
        <HStack className={"border-[1px] h-auto  w-auto  gap-3 p-3 m-3 rounded-lg border-red-800"}>
            <FaFile />
            <input  type={'file'} onChange={handleFileInput} />
        </HStack>
        
    )
}

export default TransactionsFileInput;