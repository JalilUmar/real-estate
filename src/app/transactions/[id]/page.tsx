import { getTransactionsById } from "@/controllers/transactions"
import Link from "next/link"


export default async function detail({ params }: { params: { id: string } }) {
    const detail = await getTransactionsById(params.id)
    return (
        <main>
            {
                detail?.map((e) => (

                    <section className="pt-10 px-10">
                        <h2 className="text-3xl">Transactions Detail</h2>

                        <span className="flex py-5 gap-x-7">
                            <h2>Transaction ID: </h2>
                            <p >{e.uid}</p>
                        </span>

                        <div className="p-5 border-4 border-black grid grid-cols-2  ">

                            <span className="grid gap-y-7">
                                <span>
                                    <h3>First Name</h3>
                                    <p>{e.firstName}</p>
                                </span>


                                <span>
                                    <h3>Last Name</h3>
                                    <p>{e.lastName}</p>
                                </span>

                                <span>
                                    <h3>Email</h3>
                                    <p>{e.email}</p>
                                </span>
                            </span>

                            <span className="grid gap-y-7">

                                <span>
                                    <h3>Phone Number</h3>
                                    <p>{e.phone}</p>
                                </span>

                                <span>
                                    <h3>Address</h3>
                                    <p>{e.address}</p>
                                </span>

                                <span>
                                    <h3>City</h3>
                                    <p>{e.city}</p>
                                </span>
                            </span>

                            <span>

                                <Link href={e.url} target="main" className="bg-blue-400 my-[10px] inline-block px-4 py-2 text-xl font-sans font-semibold transition-all rounded-lg shadow-black shadow-md hover:scale-105 active:scale-100" > Sign Property</Link>
                            </span>
                        </div>

                    </section>
                ))
            }
        </main>
    )
}
