import RequestComponent from "./components/requestComponent";
import { getServerSession } from "next-auth";
import authOptions from "../../api/auth/[...nextauth]/options";
import { redirect } from 'next/navigation'

export default async function Requests() {

    const session = await getServerSession(authOptions)
    console.log(session)
    if (!session) {
        redirect("/auth/signin")
    }


    const getRequests = async () => {
        const response = await fetch('http://localhost:3000/api/requests', {
            method: 'GET',
            next: {
                revalidate: 0
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
