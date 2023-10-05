import { db } from "@/database/drizzle";
import { transactionTable } from "@/database/models/transaction";
import { usersTable } from "@/database/models/users";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";




export const POST = async (req: NextRequest) => {

    const { firstName, lastName, email, phone, address, title, city } = await req.json()
    try {

        const res = await fetch("https://na1.foxitesign.foxit.com/api/templates/createFolder", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                templateIds: [
                    303830
                ],
                parties: [
                    {
                        firstName,
                        lastName,
                        emailId: email,
                        permission: "FILL_FIELDS_AND_SIGN",
                        workflowSequence: 1,
                        sequence: 1,
                        hostEmailId: "EMAIL_ID_OF_INPERSON_ADMINISTRATOR",
                        allowNameChange: "true",
                        signerAuthLevel: "Email Access Code"
                    }
                ]
            }
            )

        })

        if (res.ok) {
            const foxitRes = await res.json()

            const getUid = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1)
            // console.log(getUid)
            const postTransactions = await db.insert(transactionTable).values({
                uid: getUid[0].uid,
                firstName, lastName, email, phone, city, title, address,
                url: foxitRes.folder.folderRecipientParties[0].folderAccessURL
            }).returning()

            return NextResponse.json({
                status: 200,
                message: "success",
                postTransactions,
                url: foxitRes.folder.folderRecipientParties[0].folderAccessURL,
            })
        }
        else throw new Error
    } catch (error) {
        console.log(`errors at /api/transactions : POST \n ${error}`)
    }
}


export const GET = async (req: NextRequest) => {
    try {
        // const res = await db.select().from(transactionTable)

        // return NextResponse.json(res)

        const res = await fetch("https://na1.foxitesign.foxit.com/api/templates/list", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`,
                "Content-Type": "application/json"
            }
        })

        if (res.ok) {
            const foxitRes = await res.json()
            return NextResponse.json(foxitRes)
        }
        else throw new Error
    } catch (error) {
        console.log(`errors at /api/transactions : GET \n ${error}`)
    }
}