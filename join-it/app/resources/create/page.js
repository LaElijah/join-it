import InputBoxes from "./components/inputBoxes";
import { getServerSession } from "next-auth/next";



export default async function CreateResources() {
    const session = await getServerSession()
    if (!session) {
        return redirect("/api/auth/signin?callbackUrl=/resources")
    }
    

  
    return (
        <div>
            <h2>Share a Resource</h2>
            <InputBoxes />
            
        </div>
    )
}