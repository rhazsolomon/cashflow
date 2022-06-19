import { v4 as uuidv4 } from 'uuid';

export class Transaction {
    constructor(id, amount, tags, created, date) {
        this.id = id
        this.amount = amount
        this.tags = tags
        this.created = created
        this.date = date
    }

    static create(amount, tags, date = null) {
        const id = `transaction_${uuidv4()}`
        const created = new Date()
        return new Transaction(id, amount, tags, created, date)
    }

    static createFromData(data) {
        console.log(data)
        console.log("yo")
        // return data
        console.log("data", data)
        console.log("datas", new Date(data.date.seconds))
        const a = new Date(data.date.seconds)
        console.log("hello", a)
        
        return new Transaction(data.id, data.amount, data.tags, data.created, data.date)
    }
}
