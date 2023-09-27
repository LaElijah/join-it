
import ResourceList from "@/app/_components/resourceList";
import Link from "next/link"
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Resources() {
    const session = await getServerSession()

    if (!session) {
        return redirect("/api/auth/signin?callbackUrl=/resources")
    }

    else {


    return (
        
           <div>
            <h2>Requests</h2>
            
           <ResourceList />
            


            <Link href={"/resources/create"} >Request a resource</Link>

        </div>
        
    )
    }
}