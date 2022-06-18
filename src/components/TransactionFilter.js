import HStack from "./HStack";
import VStack from "./VStack";
import { FaArrowUp, FaFilter, FaSearch } from "react-icons/fa";
import {FiSearch} from "react-icons/fi"
import { useEffect, useState } from "react";
import BounceButton from "./BounceButton";


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


const FilterFreeTextInput = ({setAmountLower, setAmountUpper, setTag}) => {
    const [freeText, setFreeText] = useState("")

    function parseFreeText() {
        console.log(freeText)
        const ret = {
            amountLower: null,
            amountUpper: null,
            tag: null
        }
        freeText.split(" ").forEach(a => {
            if (a.startsWith(">")) {
                const n = Number.parseFloat(a.slice(1))
                ret.amountLower = n
            }
            else if (a.startsWith("<")) {
                const n = Number.parseFloat(a.slice(1))
                ret.amountUpper = n
            }
            else if (a.startsWith("#")) {
                console.log(a)
                ret.tag = a.slice(1)
            }
        })
        console.log(ret)
        return ret
    }
    useEffect(() => {
        const result = parseFreeText()
        setAmountLower(result.amountLower)
        setAmountUpper(result.amountUpper)
        setTag(result.tag)
    }, [freeText])

    return (
        <HStack className="px-3 gap-2 py-1 border-[1px] text-[#C6C7C7] font-thin rounded-md border-[#393B3D] w-full">
            
            <FiSearch className="text-[#5F6062]"/>
            <input 
            className="   placeholder:text-[#5F6062]  bg-transparent w-full"
            type={"text"} 
            placeholder={"Search Transactions"}
            value={freeText} onChange={(e) => {setFreeText(e.target.value)}}
            />

        </HStack>
        
    )
}


const TransactionFilter = ({ setSievedTransactions, allTransactions }) => {
    
    const [amountLower, setAmountLower] = useState(null)
    const [amountUpper, setAmountUpper] = useState(null)
    const [tag, setTag] = useState(null)

    const [orderBy, setOrderBy] = useState("Amount")
    const [orderAscending, setOrderAscending] = useState(true)
    

    function filterTransactions(a) {
        console.log(a, "bye")
        if (amountLower && a.amount < amountLower) {
            return false
        }
        if (amountUpper && a.amount > amountUpper) {
            return false
        }
        if (tag && !a.tags.includes(tag)){
            console.log("hi")
            return false
        }

        console.log(a, "hello")
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
    useEffect(sieveAndUpdate, [orderAscending, amountLower, amountUpper, tag])

    return (
        <HStack className=' p-4 w-full h-auto gap-2 '>
            <FilterFreeTextInput 
                setAmountLower={setAmountLower}
                setAmountUpper={setAmountUpper}
                setTag={setTag}
            />
            {/* <div className="text-slate-600">
                <BounceButton>
                    Advanced
                </BounceButton>
                
            </div> */}
            {/* <FilterOrderByComponent 
                orderBy={orderBy} 
                setOrderBy={setOrderBy} 
                orderAscending={orderAscending} 
                setOrderAscending={setOrderAscending} 
                orderByOptions={["amount", "date"]}
            /> */}
        </HStack >
        
    
    )
}


export default TransactionFilter;