import { async } from "@firebase/util"
import { addTransaction, register } from "./db"
import { Transaction } from "./model"
import { DefaultDict, parseCSV, sample } from "./util"


export async function processBankFile(file) {
    const text = await file.text()
    const transactionHints = parseCSV(text)

    function transactionHintToTransaction(th) {
        const [day, month, year] = th['Date'].split('/')
        return Transaction.create(
            Number.parseFloat(th['Amount']),
            [],
            new Date(year, month-1, day),
            th
        )
    }
    const isValidTransactionHint = (th) => {
        try {
            transactionHintToTransaction(th)
            if (th['Amount'] === undefined) { return false }
            if (th['Date'] === undefined) { return false }
            return true
        } catch (error) {
            return false
        }
    }
    const allNewTransactions = transactionHints.filter(isValidTransactionHint).map(transactionHintToTransaction)

    allNewTransactions.map((t) => {
        addTransaction(t)
    })
    return allNewTransactions
}

function getPayments() {
    return [
        new Payment(34, ["night", "day"]),
        new Payment(24, ["night", "bill"])
    ]
}


export function createRandomTransactions(){
    const possibleTags = [
        "bills",
        "groceries",
        "gym",
        "entertainment",
        "rhaz",
        "aeron",
        "holiday"
    ]
    const transactions = [
        Transaction.create(
            100 * Math.random(), 
            sample(possibleTags, Math.floor(Math.random() * 4)), 
            new Date()
        ),
    ]
    transactions.map(addTransaction)
}




export function computeTotalAmount(transactions) {
    let ret = 0
    for (let t of transactions) {
        ret += t.amount
    }
    return ret
}
export function getAllTags(transactions) {
    const ret = new Set()
    for (let t of transactions) {
        for (let tag of t.tags) {
            ret.add(tag)
        }
    }
    ret.add("_other")
    return new Array(...ret).sort()
}


function computeTagToAmount(transaction, relevantTags) {
    let i = 0
    for (let tag of transaction.tags) {
        if (relevantTags.includes(tag)) {
            i += 1
        }
    }
    if (i== 0) {return [{name: '_other', value: transaction.amount}]}
    let divisibleAmount = transaction.amount / i;

    return transaction.tags.map(t => {return {name: t, value: divisibleAmount}})
}


export function computePieDataFromTransactionTags(transactions, relevantTags=null) {
    // TODO: Let's mkae this prettier at some point!
    relevantTags = relevantTags ? relevantTags : getAllTags(transactions)
    
    const defaultDict = new DefaultDict(0)
    for (let t of transactions) {
        const tagToAmount = computeTagToAmount(t, relevantTags)
        for (let a of tagToAmount){
            defaultDict[a.name] = defaultDict[a.name] + a.value
        }
    }

    const data = []
    for (const [key, value] of Object.entries(defaultDict)) {
        data.push({ 
            name: key, 
            value: value
        })
    }
    return data.sort((a, b) => a.name.localeCompare(b.name))
}

export function computePieDataFromTransactions(transactions) {
    let categoryToAmount = {}

    for (let t of transactions) {
        if (categoryToAmount[t.categoryId] === undefined) { categoryToAmount[t.categoryId] = 0 }
        categoryToAmount[t.categoryId] = categoryToAmount[t.categoryId] + Number.parseFloat(t.amount)
    }
    const data = []
    for (const [key, value] of Object.entries(categoryToAmount)) {
        data.push({ 
            name: key, 
            value: value
        })
    }
    const ret = data.sort((a, b) => a.name.localeCompare(b.name))
    return ret
}

export async function createUser(fullName, email, password) {
    console.log("creating user...")
    const ret =  await register(fullName, email, password)
    console.log("created user")
    console.log(ret)
    return ret
}
