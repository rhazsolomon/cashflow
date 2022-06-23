import { useState } from "react"
import { updateTransactionTags } from "../backend/db"
import BounceButton from "./BounceButton"
import { Tags } from "./Tags"
import VStack from "./VStack"

export const TransactionModifier = ({transactions}) => {
        const [tags, setTags] = useState([])
        
        function onEnter(tags) {
            setTags(tags)
        }
        function applyToAllTransactions() {
            for (let t of transactions) {
                updateTransactionTags(t, tags)
            }
            setTags([])
        }
        return (
            <VStack 
                className='w-auto m-4 bgbackground-2 border-[1px] border-[#393A3E] rounded p-4 gap-4'
            >
                <Tags tags={tags} onEnter={onEnter} />
                <BounceButton 
                    className='bgbackground-2 px-3 w-min whitespace-nowrap rounded-2xl py-1'
                    onClick={applyToAllTransactions}
                >
                    Apply to all filtered
                </BounceButton>
            </VStack>
            
        )
       
}