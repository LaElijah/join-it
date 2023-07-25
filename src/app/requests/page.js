
import ResourceList from "./components/requestList";
import Link from "next/link"
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Requests() {
    const session = await getServerSession()

    if (!session) {
        return redirect("/api/auth/signin?callbackUrl=/requests")
    }

    else {


    return (
        
           <div>
            <h2>Requests</h2>
            
           <ResourceList />
            


            <Link href={"/requests/create"} >Request a resource</Link>

        </div>
        
    )
    }
}