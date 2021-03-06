import { initializeApp } from 'firebase/app'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, onAuthStateChanged, signOut } from 'firebase/auth'
import {
    getFirestore,
    getDocs,
    getDoc,
    setDoc,
    collection,
    doc,
    query,
    where,
    limit,
    deleteDoc,
    orderBy,
    onSnapshot,
    updateDoc
} from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid';
import { User } from './model';

export let currentUser = null


const firebaseApp = initializeApp({
    apiKey: "AIzaSyB3AQKEctPrt6NWteU-EZlESvbpgY15JTA",
    authDomain: "cashflow-ba925.firebaseapp.com",
    projectId: "cashflow-ba925",
    storageBucket: "cashflow-ba925.appspot.com",
    messagingSenderId: "413059469683",
    appId: "1:413059469683:web:1ccfba66b8cdaf5532f506",
    measurementId: "G-5M7CGFGQLY"
})

const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)

export function setOnAuthChange(f) {
    onAuthStateChanged(auth, async (user) => {
        console.log(user, "onAuthStateChanged")
        if (user) {
            currentUser = await getUserWithUID(user.uid)
        } else {
            currentUser = null
        }
        f(currentUser)   
    })
}

async function getData(userId, label) {
    const userCol = collection(db, 'user')
    const userDoc = doc(userCol, userId)
    const transactionsCol = collection(userDoc, label)
    const transactionSnapshot = await getDocs(transactionsCol)
    const transactionList = transactionSnapshot.docs.map(doc => doc.data())
    return transactionList

}

export async function addCategory(userId, label, color) {

    const userCol = collection(db, 'user')
    const userDoc = doc(userCol, userId)

    // Check if if already exists
    const categoryCol = collection(userDoc, 'category')
    const q = await query(categoryCol, where("label", "==", label))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.docs.length) {
        const l = querySnapshot.docs[0].data().id
        return l
    }

    // Create the new category
    const newCategoryId = `category_${uuidv4()}`
    await setDoc(doc(userDoc, 'category', newCategoryId), {
        id: newCategoryId,
        label: label,
        color: color,
        created: new Date()
    })
    return newCategoryId
}

export async function addTag(userId, label) {
    const newTagId = `tag_${uuidv4()}`

    const currentTags = await getData(userId, 'tag')
    for (let c of currentTags) {
        if (c.label === label) {
            return c.id
        }
    }

    const userCol = collection(db, 'user')
    const userDoc = doc(userCol, userId)
    await setDoc(doc(userDoc, 'tag', newTagId), {
        id: newTagId,
        label: label,
        created: new Date()
    })
    return newTagId
}


export async function addUser(user) {
    const userCol = collection(db, 'user')

    // Check for duplicates
    const q = await query(userCol, where("email", "==", user.email))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.docs.length) {
        const l = querySnapshot.docs[0].data().id
        return null
    }

    console.log(user)
    await setDoc(doc(db, 'user', user.id), {
        id: user.id,
        email: user.email,
        name: user.name,
        created: user.created,
        isTestUser: user.isTestUser,
        uid: user.uid
    })
    return user
}

export async function updateTransactionTags(transaction, tags) {
    const userCol = collection(db, 'user')
    const userDoc = doc(userCol, currentUser.id)
    await updateDoc(doc(userDoc, 'transaction', transaction.id), {
        tags: tags
    })
}
export async function addTransaction(transaction) {
    const userCol = collection(db, 'user')
    const userDoc = doc(userCol, currentUser.id)
    await setDoc(doc(userDoc, 'transaction', transaction.id), {
        id: transaction.id,
        amount: transaction.amount,
        date: transaction.date,
        created: transaction.created,
        tags: transaction.tags,
        meta: transaction.meta
    })
    return transaction
}


export async function deleteTransaction(transactionId) {
    const userCol = collection(db, 'user')
    const userDoc = doc(userCol, currentUser.id)
    await deleteDoc(doc(userDoc, "transaction", transactionId));
}

export async function deleteTransactions(transactionIds) {
    transactionIds.forEach(id => {
        deleteTransaction(id)
    });
}


export function streamTransactions(snapshot, error) {
    // This helped a lot
    //  https://blog.logrocket.com/how-to-use-react-hooks-firebase-firestore/
    const transactionCol = collection(db, 'user', currentUser.id, 'transaction')
    const itemsQuery = query(transactionCol, orderBy('date'))
    return onSnapshot(itemsQuery, snapshot, error)
}

export function streamCategories(snapshot, error) {
    // This helped a lot
    //  https://blog.logrocket.com/how-to-use-react-hooks-firebase-firestore/
    const categoryCol = collection(db, 'user', currentUser.id, 'category')
    const itemsQuery = query(categoryCol)
    return onSnapshot(itemsQuery, snapshot, error)

}

export function streamTags(snapshot, error) {
    // This helped a lot
    //  https://blog.logrocket.com/how-to-use-react-hooks-firebase-firestore/
    const tagCollection = collection(db, 'user', currentUser.id, 'tag')
    const itemsQuery = query(tagCollection)
    return onSnapshot(itemsQuery, snapshot, error)
}

export async function getUserWithUID(uid) {
    console.log(typeof(uid), "getUserWithUID")
    const userRef = collection(db, 'user')
    const q = query(userRef, where("uid", "==", uid), limit(1))
    const qSnapshot = await getDocs(q)
    let res = null
    qSnapshot.forEach((d) => {
        res = User.createFromData(d.data())
    })
    return res
}
export async function signIn(email, password) {
    await setPersistence(auth, browserLocalPersistence)
    const userCred = await signInWithEmailAndPassword(auth, email, password)
    console.log(userCred, "signIn34")
    currentUser = await getUserWithUID(userCred.user.uid)
    console.log(currentUser, "signIn")
    return currentUser
}

export async function register(name, email, password) {
    await setPersistence(auth, browserLocalPersistence)
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    console.log(userCredential, "register")
    const user = User.create(name, userCredential.user.uid, email)
    currentUser = user
    await addUser(user)
    return user
    
}

export async function cashflowSignOut() {
    await signOut(auth)
}