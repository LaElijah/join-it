import authOptions from "@/app/api/auth/[...nextauth]/options";
import InputBoxes from "./components/inputBoxes";
import { getServerSession } from "next-auth/next";
import CropComponent from "./components/cropComponent";



export default async function CreateRequests() {
    // YOU MUST USE AUTHOPTIONS TO GET SESSION
    const session = await getServerSession(authOptions)
    if (!session) {
        return redirect("/api/auth/signin?callbackUrl=/requests")
    }
    

  
    return (
        <div>
            <h2>Request a Resource</h2>
            <InputBoxes session={session} />
            
        </div>
    )
}