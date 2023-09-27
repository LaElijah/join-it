import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import authOptions from "../../api/auth/[...nextauth]/options"
import Image from "next/image"


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
                <Image
                    height={128}
                    width={128}
                    src={session.user.profile}
                    alt="profile image"
                />
            </div>
        )

    }

}