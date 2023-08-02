import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import authOptions from "../../api/auth/[...nextauth]/options"

export default async function Profile() {
    const session = await getServerSession(authOptions)
    console.log(session)

    if (!session) {
        return redirect("/api/auth/signin?callbackUrl=/profile")
    }



    else {
        return (
            <div>
                <h2>Profile</h2>
                <p>Username:{session.user.username}</p>
                </div>
        )

    }

}