import { v4 as uuidv4 } from 'uuid';

export class User {
    constructor(id, name, uid, email, created, isTestUser = true) {
        this.id = id
        this.name = name
        this.email = email
        this.uid = uid
        this.created = created
        this.isTestUser = true
    }

    static create(name, uid, email) {
        console.log(name, uid, email, "User.create")
        const id = `user_${uuidv4()}`
        const created = new Date()
        return new User(id, name, uid, email, created, false)
    }

    static createFromData(data) {
        return new User(data.id, data.name, data.uid, data.email, data.created, data?.isTestUser)
    }
}
export class Transaction {
    constructor(id, amount, tags, created, date, meta) {
        this.id = id
        this.amount = amount
        this.tags = tags
        this.created = created
        this.date = date
        this.meta = meta
    }

    static create(amount, tags, date = null, meta=null) {
        const id = `transaction_${uuidv4()}`
        const created = new Date()
        return new Transaction(id, amount, tags, created, date, meta)
    }

    static createFromData(data) {
        return new Transaction(
            data.id, 
            data.amount, 
            data.tags, 
            data.created, 
            data.date.toDate(),
            data.meta
        )
    }
}
