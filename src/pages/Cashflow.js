import { useEffect, useState } from "react";
import VStack from "../components/VStack";

import TransactionsPieChart from "../components/TransactionsPieChart";
import { streamTransactions, streamCategories, streamTags, userId } from "../backend/db";

import TransactionList from "../components/TransactionList";
import TransactionFilter from "../components/TransactionFilter";
import TransactionsFileInput from "../components/TransactionsFileInput";
import CashflowUserInfo from "../components/CashflowUserInfo";

const Cashflow = () => {

    const [allTransactions, setAllTransactions] = useState([])
    const [sievedTransactions, setSievedTransactions] = useState([])
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [selectedCategoryId, setSelectedCategoryId] = useState(null)
    const [filteredTagIds, setFilteredTagIds] = useState([])

    useEffect(() => {
        const unsubscribeTransactions = streamTransactions(
            (querySnapshot) => {
                const updatedTransactions = querySnapshot.docs.map(d => d.data())
                setAllTransactions(updatedTransactions)
                setSievedTransactions(updatedTransactions)
            },
            (error) => { console.log(error, "Error dude. (RS01)") }
        )
        const unsubscribeCategories = streamCategories(
            (querySnapshot) => {
                const updatedCategories = querySnapshot.docs.map(d => d.data())
                setCategories(updatedCategories)
                console.log(updatedCategories)
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
    }, [setAllTransactions, setSievedTransactions])

    
    return (
        <div className='flex flex-col-reverse md:flex-row h-screen items-center bg-[#272727] text-white w-screen font-rhaz text-sm'>
            <VStack className='max-w-[500px] overflow-y-auto h-full bg-[#222222]'>
                <CashflowUserInfo userId={userId}/>
                <TransactionsFileInput setAllTransactions={setAllTransactions}/>
                <TransactionFilter 
                    allTransactions={allTransactions}
                    setSievedTransactions={setSievedTransactions}
                />
                <TransactionList 
                    transactions={sievedTransactions} 
                    selectedCategoryId={selectedCategoryId} 
                    filteredTagIds={filteredTagIds} 
                    categories={categories} 
                />
            </VStack>
            <TransactionsPieChart transactions={sievedTransactions} selectedCategoryId={selectedCategoryId} setSelectedCategoryId={setSelectedCategoryId} categories={categories}/>

        </div>
    )
}

export default Cashflow;