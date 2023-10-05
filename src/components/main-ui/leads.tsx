import Link from "next/link";
import GetAllLeads from "../leads-ui/getAllLeads";


export default function Leads() {
    return (
        <main className="">
            <div className="w-3/4 mx-auto pt-8 pb-3 flex">
                <h2 className="text-3xl font-sans font-bold mr-auto">Leads List</h2>
                <Link href={"/create-lead"} className="bg-blue-400 px-4 py-2 text-xl  font-sans font-bold transition-all rounded-lg shadow-black shadow-md hover:scale-105 active:scale-100"> +{"  "} Create Lead </Link>
            </div>
            <GetAllLeads />
        </main>
    )
}
