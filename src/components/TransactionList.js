import HStack from "./HStack"
import VStack from "./VStack"

import { FaDollarSign, FaEnvira, FaTag, FaPlus, FaTrash, FaLock } from "react-icons/fa";
import { deleteTransaction, updateTransactionTags } from "../backend/db";
import BounceButton from "./BounceButton";
import { useState } from "react";


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
        <HStack className='gap-1 align-middle justify-end font-bold bg-red-900 py-1 px-3 rounded-full bg-opacity-30 border-[1px] border-red-900 border-opacity-50'>
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


const TransactionTags = ({transaction}) => {

    let initialText = ""
    for (let tag of transaction.tags) {
        initialText += "#" + tag + " "
    }
    const [value, setValue] = useState(initialText)
    const [editing, setEditing] = useState(false)
    function onKeyDown(e) {
        if (e.key == 'Enter') {
            const tags = value.split(' ').filter(a => a.startsWith('#')).map(a => a.slice(1))
            updateTransactionTags(transaction, tags)
            setEditing(false)
        }
    }
    return (
        <div className="w-full p-2" onClick={() => setEditing(true)}>
            {editing ? (
                <input
                autoFocus
                type={"text"}
                className={"px-3 py-1 border-[#393B3D] bg-[#222222] border-[1px] rounded-md w-full"}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                />
            ) : (
                <BounceButton>
                <HStack className='gap-2 w-full flex-wrap text-xs'>
                    
                        {transaction.tags.map(t => (
                            <HStack className=" bg-[#7A7C7F] py-1 px-3 rounded-full gap-2 border-slate-500 shadow-sm border-[2px]">
                                <FaTag style={{ fill: 'border-gray-500' }} />
                                {t}
                            </HStack>
                        ))}
                        {transaction.tags.length == 0 && (
                            <HStack className="border-[#7A7C7F] text-[#7A7C7F] border-[1px] py-1 px-4 rounded-full gap-2">
                                <FaTag style={{ fill: 'border-gray-500' }} />
                                Add Tag
                            </HStack>
                        )}
                  
                </HStack>
                </BounceButton>
            )}
        </div>
    )
}

const TransactionElementMeta = ({meta}) => {
    return (
        <VStack className="p-2 gap-3 border-[1px] border-slate-700 rounded bg-[#2D2D2D] text-gray-500">
            <FaLock />
            <div>
                {Object.entries(meta).sort().map((a,b) => (
                    <HStack className='gap-2'>
                        <div className="w-full font-bold">{a[0]}</div>
                        <div className="text-right w-full whitespace-nowrap">{a[1]}</div>
                    </HStack>
                ))}
            </div>
        </VStack>
    )
}
const TransactionElement = ({ transaction }) => {
    return (
        <HStack className='p-4 gap-3 hover:bg-[#272727] h-auto w-full border-b-[1px] border-b-slate-700'>
            
            <VStack className='w-full h-auto gap-2 '>
                <HStack className="w-full h-auto gap-3">
                <TransactionElementAmount amount={transaction.amount} />        
                    <div className="w-full text-right">
                        {transaction.date.toDateString()}
                    </div>
                    <BounceButton onClick={() => deleteTransaction(transaction.id)}>
                        <FaTrash />
                    </BounceButton>
                </HStack>
                <TransactionElementMeta meta={transaction.meta}/>
                

                <TransactionTags transaction={transaction}/>
            </VStack>
        </HStack>
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
        <VStack className='h-full overflow-y-auto scrollbar-hide items-start justify-start'>
            {transactions.map(t => (
                <TransactionElement transaction={t} key={t.id} categories={categories} />
            ))}
        </VStack>
    )
}

export default TransactionList;