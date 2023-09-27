import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation";
import authOptions from "@/app/api/auth/[...nextauth]/options";







export default async function Communication () {

    const session = await getServerSession(authOptions)


    if (!session) {
        return redirect('/api/auth/signin=callbackUrl=/comms')
    }

    const response = await fetch('http://localhost:3000/api/comms/groups', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'user-id': session.user.id,
        }
    })

    const data = await response.json()

    if (data.status === 'failure') {
        throw new Error('Failed to get groups')
    }

    const groups = data.groups || []

    

    return (
        <div>

            <h1>Page</h1>
            <h2>Groups</h2>
            <div>
            {/* {groups} */}
            </div>

        </div>

    )
}