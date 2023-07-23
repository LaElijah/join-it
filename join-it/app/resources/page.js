import ResourceList from "./components/resourcetList";
import Link from "next/link"

export default function Resources() {

    return (
        
           <div>
            <h2>Requests</h2>
            
           <ResourceList />
            


            <Link href={"resources/create"} >Request a resource</Link>

        </div>
        
    )
}