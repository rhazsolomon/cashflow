import HStack from "./HStack"
import VStack from "./VStack"

import { FaTrash, FaLock } from "react-icons/fa";
import { deleteTransaction, updateTransactionTags } from "../backend/db";
import BounceButton from "./BounceButton";
import { useState } from "react";
import { Tags } from "./Tags";


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
        <BounceButton onClick={() => setHidden(!hidden)}>
            {/* <VStack className="p-2 gap-3 text-left border-[1px] border-slate-700 rounded bg-[#2D2D2D] text-gray-500"> */}
            <VStack className="p-2 gap-3 text-left  rounded bg-[#2D2D2D] text-gray-500">
                <HStack className='gap-2'>
                    <FaLock />
                    <div>
                        {meta["Other Party"]}
                    </div>
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
        </BounceButton>

    )
}
const TransactionElement = ({ transaction }) => {
    return (
        <VStack className='p-4 w-full h-auto gap-3 hover:bg-slate-800'>
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


const TransactionList = ({ transactions, categories }) => {
    if (transactions.length == 0) {
        return (
            <div className="h-full w-full p-4 text-center text-[#5F6062]">
                No Transactions Found
            </div>
        )
    }
    return (
        <VStack className='gap-4 h-full overflow-y-auto scrollbar-hide items-start justify-start'>
            <div className="p-4">
                {transactions.length} transactions found.
            </div>
            {transactions.map(t => (
                <TransactionElement transaction={t} key={t.id} categories={categories} />
            ))}
        </VStack>
    )
}

export default TransactionList;