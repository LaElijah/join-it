
import RequestList from "./components/requestList";
import Link from "next/link"

import { redirect } from 'next/navigation';



export default async function Requests() {

  
    if (!session) {
        redirect("/signin")
    }
    if (session) {

        return (

            <div>
                <h2>Requests</h2>

                <RequestList />



                <Link href={"requests/create"} >Request a resource</Link>

            </div>


        )
    }
}