import authOptions from "@/app/api/auth/[...nextauth]/options";
import RequestInputs from "../../../_components/requestInputs";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function CreateRequests() {

    const session = await getServerSession(authOptions)
    if (!session) {
        return redirect("/api/auth/signin?callbackUrl=/requests")
    }
    

  
    return (
        <div>
            
            <RequestInputs session={session} />
            
        </div>
    )
}