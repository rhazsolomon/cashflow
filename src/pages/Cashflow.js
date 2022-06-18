import { useEffect, useState } from "react";
import VStack from "../components/VStack";

import PieChart from "../components/PieChart";
import { streamTransactions, streamCategories, streamTags, userId } from "../backend/db";

import backend from "../backend/backend"
import TransactionList from "../components/TransactionList";
import Filter from "../components/TransactionFilter";
import TransactionFilter from "../components/TransactionFilter";


const orderByOptions = ['Date', 'Amount']

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

const Cashflow = () => {

    const [allTransactions, setAllTransactions] = useState([])
    const [sievedTransactions, setSievedTransactions] = useState([])
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])



    const [selectedCategoryId, setSelectedCategoryId] = useState(null)
    const [filteredTagIds, setFilteredTagIds] = useState([
        // 'tag_0F0D9CF7-9197-464E-BA6A-9D33B2540639',
        // 'tag_47932CFC-CD6E-4AA8-B9A3-FFEC1503F363'
    ])
    

    
    function computePieDataFromTransactions(transactions) {
        let categoryToAmount = {}

        for (let t of transactions) {
            if (categoryToAmount[t.categoryId] === undefined) { categoryToAmount[t.categoryId] = 0 }
            categoryToAmount[t.categoryId] = categoryToAmount[t.categoryId] + Number.parseFloat(t.amount)
        }
        const data = []
        for (const [key, value] of Object.entries(categoryToAmount)) {
            data.push({ name: key, value: value, color: getColor(categories, key) })
        }
        const ret = data.sort((a, b) => a.name.localeCompare(b.name))
        return ret
    }

    async function handleFileInput(e) {
        const allNewTransactions = await backend.processBankFile(e.target.files[0])
        setAllTransactions(allNewTransactions)
    }

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

    const FileInput = ({ handleFileInput }) => {
        return (
            <input type={'file'} onChange={handleFileInput} />
        )
    }
    return (
        <div className='flex flex-col-reverse md:flex-row h-screen items-center bg-[#272727] text-white w-screen font-rhaz text-sm'>
            <VStack className='max-w-[500px] overflow-y-auto h-full bg-[#222222]'>
                <div>{userId}</div>
                <FileInput handleFileInput={handleFileInput} />
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
            <PieChart data={computePieDataFromTransactions(sievedTransactions)} selectedCategoryId={selectedCategoryId} setSelectedCategoryId={setSelectedCategoryId} />

        </div>
    )
}

export default Cashflow;