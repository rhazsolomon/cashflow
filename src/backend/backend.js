import { addTransaction } from "../database/db"
import { parseCSV } from "../utility/util"

const backend = {
    processBankFile: async (file) => {
        const text = await file.text()
        console.log(text)
        const transactionHints = parseCSV(text)
        console.log(transactionHints)
        const transactionHintToTransaction = (th) => {
            const [day, month, year] = th['Date'].split('/')
            return {
                category: 'category_8A13196D-5F8C-4FC6-934F-979ECA2FA9AD',
                amount: Math.abs(Number.parseFloat(th['Amount'])),
                date: new Date(year, month, day),
                tags: []
            }
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
            addTransaction(t.amount, t.date, [], null)
        })
        return allNewTransactions
    }

}

export default backend;