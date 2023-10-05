import { getAllTransactions } from '@/controllers/transactions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function Transactions() {

    const trans = await getAllTransactions()
    return (
        <main>
            <section className='grid grid-cols-7 p-10 gap-5'>
                {
                    trans?.map((e) => (

                        <Link key={e.uid} href={`/transactions/${e.uid}`} className='bg-blue-300 px-3 py-6 inline-block rounded-lg mx-auto'>
                            <Image className='rounded' src={"/house-pic.jpg"} alt='' height={200} width={200} />
                            <h3>{`${e.firstName}  ${e.lastName}`}</h3>
                            <p>{e.address}</p>
                        </Link>
                    ))
                }
            </section>
        </main>
    )
}
