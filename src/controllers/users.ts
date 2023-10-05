"use server"

import { db } from "@/database/drizzle"
import { usersTable } from "@/database/models/users"



export const getAllUsers = async () => {
    return await db.select().from(usersTable)
}