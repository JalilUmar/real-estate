import Link from 'next/link'
import React from 'react'

export default function Header() {
    return (
        <header className='w-full bg-blue-400 shadow-lg shadow-slate-600 py-1 flex items-center sticky top-0'>

            <Link href={"/"} className='w-1/2 mx-10 text-3xl font-sans font-extrabold'>My Real State</Link>

            <span className='flex w-1/2 mx-auto items-center gap-x-[70px] '>
                <Link href={"/"} className='text-2xl font-sans font-bold px-10 focus:border-b-2 transition-all  focus:border-b-black py-5 '>Leads</Link>
                <Link href={"/transactions"} className='text-2xl font-sans font-bold px-10 focus:border-b-2 transition-all focus:border-b-black py-5 '>Transactions</Link>
            </span>
        </header>
    )
}
