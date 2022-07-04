import { useEffect, useState } from "react";
import VStack from "../components/VStack";

import TransactionsPieChart, { LuminousPieChart } from "../components/TransactionsPieChart";
import { streamTransactions, streamCategories, streamTags } from "../backend/db";

import TransactionList from "../components/TransactionList";
import TransactionFilter from "../components/TransactionFilter";
import TransactionsFileInput from "../components/TransactionsFileInput";
import CashflowUserInfo from "../components/CashflowUserInfo";
import CashflowUtilities from "../components/CashflowUtilities";
import { Transaction } from "../backend/model";
import HStack from "../components/HStack";
import { TransactionModifier } from "../components/TransactionModifier";

const Cashflow = ({user, setUser}) => {

    const [allTransactions, setAllTransactions] = useState([])
    const [sievedTransactions, setSievedTransactions] = useState([])
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [selectedCategoryId, setSelectedCategoryId] = useState(null)
    const [filteredTagIds, setFilteredTagIds] = useState([])

    useEffect(() => {
        const unsubscribeTransactions = streamTransactions(
            (querySnapshot) => {
                const updatedTransactions = querySnapshot.docs.map(d => Transaction.createFromData(d.data())  )
                setAllTransactions(updatedTransactions)
            },
            (error) => { console.log(error, "Error dude. (RS01)") }
        )
        const unsubscribeCategories = streamCategories(
            (querySnapshot) => {
                const updatedCategories = querySnapshot.docs.map(d => d.data())
                setCategories(updatedCategories)
            },
            (error) => { console.log(error, "Error dude. (RS02)") }
        )
        const unsubscribeTags = streamTags(
            (querySnapshot) => {
                const updatedTags = querySnapshot.docs.map(d => d.data())
                setTags(updatedTags)
            },
            (error) => { console.log(error, "Error dude. (RS03)") }
        )
        return () => {
            unsubscribeTransactions()
            unsubscribeCategories()
            unsubscribeTags()
        }
    }, [setAllTransactions])

    
    return (
        <div className='flex flex-col-reverse md:flex-row h-screen items-center bg-background-1 text-foreground-1 w-screen font-rhaz text-sm'>
            <VStack className='overflow-y-auto h-full bg-background-2 min-w-[400px] w-full max-w-2xl  border-r-background-3 border-r-[1px]'>
                <VStack className="mt-4">
                    <TransactionFilter 
                        sievedTransactions={sievedTransactions}
                        allTransactions={allTransactions}
                        setSievedTransactions={setSievedTransactions}
                    />
                    <svg height="20px">
                        <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="#393A3E"/>
                    </svg>
                    <TransactionModifier transactions={sievedTransactions} />
                    <div className="px-4 mt-2 text-xs text-foreground-2">
                        Found {sievedTransactions.length} transactions.
                    </div>
                </VStack>
                
                
                    
                
                <TransactionList 
                    transactions={sievedTransactions} 
                    selectedCategoryId={selectedCategoryId} 
                    filteredTagIds={filteredTagIds} 
                    categories={categories} 
                />
            </VStack>
            <VStack className='w-full h-full bg-black'>
                <HStack className='p-2'>
                    <TransactionsFileInput setAllTransactions={setAllTransactions}/>
                    <CashflowUserInfo user={user} setUser={setUser}/>
                </HStack>
                { user.isTestUser && (
                        <CashflowUtilities setAllTransactions={setAllTransactions} allTransactions={allTransactions}/>
                    )}
                <TransactionsPieChart 
                    transactions={sievedTransactions} 
                    selectedCategoryId={selectedCategoryId} 
                    setSelectedCategoryId={setSelectedCategoryId} 
                    categories={categories}
                />
                {/* <LuminousPieChart transactions={sievedTransactions}/> */}
            </VStack>
            

        </div>
    )
}

export default Cashflow;