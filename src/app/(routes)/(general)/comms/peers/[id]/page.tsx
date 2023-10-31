
import User from "@/app/_utils/models/user"
import authOptions from "@/app/(routes)/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"

import UserActions from "@/app/_components/userActions"

export default async function PeerProfile({params}: any) {
const user = await User.findById(params.id)
const session = await getServerSession(authOptions)
const hostUser = await User.findById(session.user.id).populate('friends')
const test = hostUser

let isFollowing = false
if (hostUser.friends) {
const hostUserFriends = await hostUser.friends
isFollowing = (hostUserFriends.find((element: any) => element.username === user.username)) !== undefined
}

console.log(isFollowing)


    return (
        <div>
            <UserActions 
            username={user.username}
            sessionUsername={session.user.username}
            isFollowing={isFollowing}
            />

            
        </div>
    )
}