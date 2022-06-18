import HStack from "./HStack";
import VStack from "./VStack";
import { FaArrowUp, FaFilter } from "react-icons/fa";
import { useEffect, useState } from "react";


const FilterOrderByComponent = ({ orderBy, setOrderBy, orderAscending, setOrderAscending }) => {
    const arrowStyle = {
        transform: orderAscending ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.5s'
    }

    function onClickOrderBy() {
        if (orderBy == "Date") {
            setOrderBy("Amount")
        } else {
            setOrderBy("Date")
        }
    }
    return (
        <HStack className='rounded-full bg-slate-400 border-[1px] border-slate-300  w-min gap-2 hover:opacity-80 hover:bg-slate-600 text-slate-100' >
            <div
                onClick={() => setOrderAscending(!orderAscending)}
                style={arrowStyle}
                className='bg-slate-500 p-2 rounded-full hover:bg-slate-600 shadow-slate-500'
            >
                <FaArrowUp />
            </div>

            <div className="w-auto pr-5 font-bold " onClick={onClickOrderBy}>{orderBy}</div>
        </HStack>
    )
}


const FilterFreeTextInput = ({setAmountLower}) => {
    const [freeText, setFreeText] = useState("")

    useEffect(() => {
        freeText.split(" ").forEach(a => {
            if (a.startsWith(">")) {
                const n = Number.parseFloat(a.slice(1))
                setAmountLower(n)
            }
        })
    }, [freeText])

    return (
        <input 
            className="text-white px-3 py-1 bg-slate-600 rounded-2xl font-semibold"
            type={"text"} 
            placeholder={">40"}
            value={freeText} onChange={(e) => {setFreeText(e.target.value)}}
        />
    )
}


const TransactionFilter = ({ setSievedTransactions, allTransactions }) => {
    
    const [amountLower, setAmountLower] = useState(30)

    const [orderBy, setOrderBy] = useState("Amount")
    const [orderAscending, setOrderAscending] = useState(true)
    

    function filterTransactions(a) {
        if (amountLower && a.amount < amountLower) {
            return false
        }
        return true
        
    }
    function sortTransactions(a, b)  {
        let ret = 0
        if (orderBy == "Amount") {
            ret =  a.amount - b.amount
        } else {
            ret =  a.date - b.date
        }
        return orderAscending ? ret : -ret
    }

    function sieveAndUpdate() {
        return setSievedTransactions(allTransactions
            .filter(filterTransactions)
            .sort(sortTransactions)
        )
    }
    useEffect(sieveAndUpdate, [orderAscending, amountLower])

    return (
        <HStack className='bg-[#272727] p-3 m-3 w-auto h-auto gap-2 rounded-xl border-[1px] border-slate-600'>
            <FaFilter />
            <FilterFreeTextInput 
                setAmountLower={setAmountLower}
            />
            <FilterOrderByComponent 
                orderBy={orderBy} 
                setOrderBy={setOrderBy} 
                orderAscending={orderAscending} 
                setOrderAscending={setOrderAscending} 
                orderByOptions={["amount", "date"]}
            />
        </HStack >
        
    
    )
}


export default TransactionFilter;