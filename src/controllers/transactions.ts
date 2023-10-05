"use server"

import { db } from "@/database/drizzle"
import { transactionTable } from "@/database/models/transaction"
import { eq } from "drizzle-orm"


export const getAllTransactions = async () => {
    try {
        const res = await db.select().from(transactionTable)

        return res
    } catch (error) {
        console.log(`errors at /controllers/transactions : GET \n ${error}`)
    }
}

export const getTransactionsById = async (id: string) => {
    try {
        const res = await db.select().from(transactionTable).where(eq(transactionTable.uid, id))

        return res
    } catch (error) {
        console.log(`errors at /controllers/transactions/:id : GET \n ${error}`)
    }
}