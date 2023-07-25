import InputBoxes from "./components/inputBoxes";
import { getServerSession } from "next-auth/next";



export default async function CreateRequests() {
    const session = await getServerSession()
    if (!session) {
        return redirect("/api/auth/signin?callbackUrl=/requests")
    }
    

  
    return (
        <div>
            <h2>Request a Resource</h2>
            <InputBoxes />
            
        </div>
    )
}