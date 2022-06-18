import HStack from "./HStack"
import VStack from "./VStack"

import { FaDollarSign, FaEnvira, FaTag, FaPlus, FaTrash } from "react-icons/fa";
import { deleteTransaction } from "../backend/db";
import BounceButton from "./BounceButton";


const TransactionElementTag = ({ tag_id }) => {
    let content = (<FaPlus />)
    if (tag_id) {
        content = (<>
            <FaTag style={{ fill: 'border-gray-500' }} />
            <span>{tag_id}</span>
        </>)
    }
    return (
        <BounceButton>
            <HStack className='w-min inline h-auto border-[1pt] gap-2 border-gray-500 text-gray-500 px-4 rounded-full py-1'>
                {content}
            </HStack>
        </BounceButton>

    )
}


function getLabel(categories, categoryId) {
    if (categoryId === null) {
        return 'Unknown'
    }
    if (categories === undefined) {
        return 'undefined'
    }
    const filtered = categories.filter(c => c.id == categoryId)
    if (filtered.length) {
        return filtered[0].label
    } else {
        return 'not found'
    }
}


function getColor(categories, categoryId) {
    if (categoryId === null) {
        return 'rgba(100, 100, 100, 0.5)'
    }
    if (categories === undefined) {
        return 'blue'
    }
    const filtered = categories.filter(c => c.id == categoryId)
    if (filtered.length) {
        return filtered[0].color
    } else {
        return 'red'
    }
}


const TransactionElementAmount = ({ amount }) => {

    return (
        <HStack className='gap-1 align-middle justify-end font-bold'>
            <FaDollarSign className="text-sm" />
            {Number.parseFloat(amount).toFixed(2)}
        </HStack>
        
    )
}


const TransactionElementCategory = ({ category, categories }) => {
    return (
        <BounceButton>
            <HStack className="gap-2 border-[1pt] h-auto w-auto py-1 px-2 rounded-lg" style={{ borderColor: getColor(categories, category) }}>
                <FaEnvira style={{ fill: getColor(categories, category) }} />
                {getLabel(categories, category)}
            </HStack>
        </BounceButton>
    )
}


const TransactionElement = ({ transaction, categories }) => {
    return (
        <HStack className='p-4 gap-3 hover:bg-[#272727] h-auto w-full'>

            <VStack className='max-w-[600px] h-auto  '>
                <HStack className="w-full h-auto">
                    <TransactionElementAmount amount={transaction.amount} />
                </HStack>
                <div className="flex-wrap flex py-2 h-auto gap-2">
                    {transaction.tags?.map(t => (<TransactionElementTag tag_id={t} key={t.id + transaction.id} />))}
                    <TransactionElementTag />
                </div>
                <HStack className='gap-3'>
                    <BounceButton onClick={() => deleteTransaction(transaction.id)}>
                        <FaTrash />
                    </BounceButton>
                    {new Date(transaction.date.seconds).toDateString()}
                </HStack>
            </VStack>
        </HStack>
    )
}


const TransactionList = ({ transactions, categories }) => {
    return (
        <VStack className='h-full overflow-y-auto scrollbar-hide items-start justify-start'>
            {transactions.map(t => (
                <TransactionElement transaction={t} key={t.id} categories={categories} />
            ))}
        </VStack>
    )
}

export default TransactionList;