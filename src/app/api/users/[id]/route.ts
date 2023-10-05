import { db } from "@/database/drizzle";
import { usersTable } from "@/database/models/users";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server"


export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {

    try {
        const res = await db.delete(usersTable).where(eq(usersTable.uid, params.id)).returning()


        return NextResponse.json(res);


    } catch (error) {
        console.log(`Error on /api/users/:id : DELETE \n`, error)
    }
}
