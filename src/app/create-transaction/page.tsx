"use client"

import { redirect, useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function CreateTransaction() {
    const router = useRouter()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [title, setTitle] = useState("")
    const [city, setCity] = useState("")

    const handleCreateNewLead = async () => {
        await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({
                firstName, lastName, email, phone, address, title, city
            })
        })
        setFirstName("")
        setLastName("")
        setEmail("")
        setPhone("")
        setAddress("")
        setTitle("")
        setCity("")

        router.push("/transactions")
    }

    return (
        <form method='POST' className='bg-blue-400 w-[500px] my-10 mx-auto py-5 grid justify-center gap-y-6 rounded-lg shadow-lg shadow-black'>
            <h2 className='text-center text-4xl font-sans font-bold pb-5'>Create Transaction</h2>
            <input
                type="text"
                name="FirstName"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="p-2 w-[400px] shadow-inner shadow-black rounded focus:outline-none focus:ring-0 focus:border-none"
            />
            <input
                type="text"
                name="LastName"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="p-2 w-[400px] shadow-inner shadow-black rounded focus:outline-none focus:ring-0 focus:border-none"
            />
            <input
                type="email"
                name="email"
                placeholder="Enter valid email adress"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="p-2 w-[400px] shadow-inner shadow-black rounded focus:outline-none focus:ring-0 focus:border-none"
            />
            <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="p-2 w-[400px] shadow-inner shadow-black rounded focus:outline-none focus:ring-0 focus:border-none"
            />
            <input
                type="text"
                name="title"
                placeholder={`You are a "buyer" or "seller" ?...`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="p-2 w-[400px] shadow-inner shadow-black rounded focus:outline-none focus:ring-0 focus:border-none"
            />
            <input
                type="text"
                name="address"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="p-2 w-[400px] shadow-inner shadow-black rounded focus:outline-none focus:ring-0 focus:border-none"
            />
            <input
                type="city"
                name="city"
                placeholder="Enter your city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="p-2 w-[400px] shadow-inner shadow-black rounded focus:outline-none focus:ring-0 focus:border-none"
            />



            <button onClick={handleCreateNewLead} className="bg-white mt-5 px-4 py-2 w-[350px] mx-auto text-xl font-sans font-semibold transition-all rounded-lg shadow-black shadow-md hover:scale-105 active:scale-100">Create Trasaction</button>
        </form>
    )
}
