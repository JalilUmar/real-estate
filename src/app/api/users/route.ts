
import { db } from "@/database/drizzle";
import { usersTable } from "@/database/models/users";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid"



export const POST = async (req: NextRequest) => {
    const { firstName, lastName, email, phone, address, password } = await req.json()
    try {
        const foxitCreateUser = await fetch("https://na1.foxitesign.foxit.com/api/users/create", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: {
                    firstName,
                    lastName,
                    emailId: email,
                    userRole: "user",
                    // active: true,
                    department: "",
                    title: "",
                    loginPassword: password,
                    sendMailForPasswordReset: true
                }
            })
        })

        if (foxitCreateUser.ok) {

            const DBres = await db.insert(usersTable).values({
                uid: v4(),
                firstName, lastName, email, phone
            }).returning()

            const foxitRes = await foxitCreateUser.json();
            return NextResponse.json({ foxitRes, DBres })

        } else {
            console.error("Foxit API request failed:", foxitCreateUser.status, await foxitCreateUser.text());
            return NextResponse.json("Failed to create a user on Foxit API.", { status: foxitCreateUser.status });
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json("An error occurred while processing your request.", { status: 500 });
    }
}


export const GET = async (req: NextRequest) => {
    try {
        const res = await fetch("https://na1.foxitesign.foxit.com/api/users/list", {
            method: "GET",
            cache: "no-store",
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
        console.log(`Error on /api/user : GET \n`, error)
    }
}



