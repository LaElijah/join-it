
import User from "@/app/_utils/models/user"
import authOptions from "@/app/(routes)/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"

import FollowButton from "@/app/_components/followButton"
import dbConnection from "@/app/_utils/db/dbConnection"

export default async function PeerProfile({ params }: any) {
    await dbConnection()
    const session = await getServerSession(authOptions)


    const hostUser = await User.findById(session.user.id).populate('connections').populate('connectionRequests')
    const user = await User.findOne({ username: params.id })

    const userFollows = hostUser.connections.map((element: any) => element.username === user.username).length > 0
    const userRequested = hostUser.connectionRequests.map((element: any) => element.username === user.username).length > 0

    let isConnected
    if (userFollows) isConnected = "YES"
    if (userRequested) isConnected = "PENDING"
    if (!userFollows && !userRequested) isConnected = "NO"




    return (
        <div>
            <h2>{user.username}</h2>
            <FollowButton
                username={user.username}
                sessionUsername={session.user.username}
                isConnected={isConnected}
            />


        </div>
    )
}