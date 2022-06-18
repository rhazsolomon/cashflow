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

}
