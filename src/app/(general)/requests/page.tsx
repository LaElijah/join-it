import RequestComponent from "./components/requestComponent";
import { getServerSession } from "next-auth";
import authOptions from "../../api/auth/[...nextauth]/options";
import { redirect } from 'next/navigation'

export default async function Requests() {

    const session = await getServerSession(authOptions)
    console.log(session)
    if (!session) {
        redirect("/api/auth/signin")
    }


    const getRequests = async () => {
        const response = await fetch('http://127.0.0.1:3000/api/requests', {
            method: 'GET',
            next: {
                revalidate: 60,
            },
        })
        const data = await response.json();
        return data;
    }

    const data = await getRequests()


    return (

        <section>
            
            <RequestComponent data={data} />
        </section>

    )

}
