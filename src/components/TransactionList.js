import HStack from "./HStack"
import VStack from "./VStack"

import { FaTrash, FaLock, FaArrowRight } from "react-icons/fa";
import { deleteTransaction, updateTransactionTags } from "../backend/db";
import BounceButton from "./BounceButton";
import { useState } from "react";
import { Tags } from "./Tags";
import { FiArrowRight, FiChevronRight } from "react-icons/fi";


const TransactionElementAmount = ({ amount }) => {
    return (
        <HStack className='gap-1 align-middle justify-end font-bold rounded-full bg-opacity-30 '>
            ${Number.parseFloat(amount).toFixed(2)}
        </HStack>
    )
}

const TransactionElementMeta = ({ meta }) => {
    const [hidden, setHidden] = useState(true)
    return (

        <VStack className="p-2 gap-3 text-left  rounded bg-background-1 textbackground-2">
            <HStack className='gap-2'>
                <FaLock />
                <div className="whitespace-nowrap">
                    {meta["Other Party"]}
                </div>
                <HStack className='w-full justify-end'>
                    <BounceButton onClick={() => setHidden(!hidden)}>
                        <FiChevronRight />
                    </BounceButton>
                </HStack>


            </HStack>

            {!hidden && (
                <div>
                    {Object.entries(meta).sort().map((a, b) => (
                        <HStack className='gap-2'>
                            <div className="w-full font-bold">{a[0]}</div>
                            <div className="text-right w-full whitespace-nowrap">{a[1]}</div>
                        </HStack>
                    ))}
                </div>
            )}
        </VStack>


    )
}
const TransactionElement = ({ transaction, selected, onClick }) => {
    return (

        <VStack 
            className={`p-4 w-full h-auto gap-3 hover:bg-background-5 border-l-[6px] ${selected ? 'border-l-primary': 'border-l-background-3'}`}
            onClick={onClick}
        >
            <HStack className="w-full h-auto gap-3">

                <div className="whitespace-nowrap">
                    {transaction.date.toDateString()}
                </div>


                <BounceButton onClick={() => deleteTransaction(transaction.id)}>
                    <FaTrash />
                </BounceButton>
                <div className="w-full text-right">
                    <TransactionElementAmount amount={transaction.amount} />
                </div>
            </HStack>

            <TransactionElementMeta meta={transaction.meta} />
            <Tags
                tags={transaction.tags}
                onEnter={(tags) => updateTransactionTags(transaction, tags)}
            />
        </VStack>



    )
}


const TransactionList = ({ transactions }) => {
    
    const [selectedTransaction, setSelectedTransaction] = useState(null)

    if (transactions.length == 0) {
        return (
            <div className="h-full w-full p-4 text-center text-[#5F6062]">
                No Transactions Found
            </div>
        )
    }
    return (
        <VStack className='h-full overflow-y-auto scrollbar-hide items-start justify-start'>
            {transactions.map((t, i) => (
                <TransactionElement transaction={t} key={t.id} selected={selectedTransaction == i} onClick={() => {console.log("blfd");setSelectedTransaction(i)}}/>
            ))}
        </VStack>
    )
}

export default TransactionList;