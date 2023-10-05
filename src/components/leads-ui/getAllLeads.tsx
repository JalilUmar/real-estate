"use client"

import { getAllUsers } from "@/controllers/users";
import { db } from "@/database/drizzle";
import { usersTable } from "@/database/models/users";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"


interface users {
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
}


export default function GetAllLeads() {

    const router = useRouter()
    const [allUsers, setAllUsers] = useState<users[]>([]);

    const fetchData = async () => {
        try {
            const response = await getAllUsers()
            return response
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/users/${id}`, {
                cache: 'no-store',
                method: 'DELETE',
            });
            if (!res.ok) {
                throw new Error('Failed to delete user');
            }
            // After successful deletion, re-fetch the updated user data
            const updatedUsers = await fetchData();
            setAllUsers(updatedUsers);
            router.refresh()
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    useEffect(() => {
        fetchData()
            .then((data) => {
                // Handle the fetched data, e.g., store it in state
                setAllUsers(data);
            })
            .catch((error) => {
                console.error('Error in useEffect:', error);
            });
    }, [fetchData]);

    return (
        <main className=" max-h-[750px] pb-5  overflow-y-auto transition-all">
            {
                allUsers.map((user) => (
                    <section key={user.uid} className="bg-slate-200 w-3/4 mt-6 py-5  mx-auto grid rounded-lg shadow-md shadow-black ">
                        <div className="flex mb-8 px-10 ">
                            <h2 className="text-3xl font-sans font-bold">{`${user.firstName} ${user.lastName}`}</h2>
                            <button onClick={() => handleDelete(user.uid)} className="ml-auto text-xl font-sans font-bold text-red-600 hover:text-2xl active:text-xl">Delete</button>
                        </div>

                        <div className="flex px-10">
                            <span className="grid mr-8 ">
                                <h4 className="text-[14px] opacity-70">Phone Number</h4>
                                <p className="text-lg font-sans font-semibold">{user.phone}</p>
                            </span>

                            <span className="grid mr-8 ">
                                <h4 className="text-[14px] opacity-70">Email Address</h4>
                                <p className="text-lg font-sans font-semibold">{user.email}</p>
                            </span>

                            <span className="flex gap-x-10 items-center ml-auto">
                                <Link href={"/create-transaction"} className="bg-blue-400 px-4 py-2 text-xl font-sans font-semibold transition-all rounded-lg shadow-black shadow-md hover:scale-105 active:scale-100">Create Transaction</Link>
                                <Link href={`/transactions/${user.uid}`} className="bg-transparent border-2 border-black px-4 py-2 text-xl font-sans font-semibold  rounded-lg hover:border-1 hover:bg-blue-400 transition-all hover:scale-105 active:scale-100">View Transaction</Link>
                            </span>
                        </div>

                    </section>

                ))
            }

        </main>
    )
}
