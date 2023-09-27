import RequestComponent from "@/app/_components/requestComponent";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import { redirect } from 'next/navigation'
import Request from "@/app/_utils/models/request";
import dbConnection from "@/app/_utils/db/dbConnection";



export default async function Requests() {

    const session = await getServerSession(authOptions)
    if (!session) {
        redirect("/api/auth/signin")
    }

    await dbConnection()
    
    return (

        <>
            <RequestComponent requests={await Request.find({})} />
        </>

    )

}
