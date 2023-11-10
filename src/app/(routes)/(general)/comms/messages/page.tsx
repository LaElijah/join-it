import ContentWrapper from "@/app/_components/contentWrapper";
import MessageClient from "@/app/_components/messageClient";
import styles from "@/app/_styles/pages/messages.module.scss"
import authOptions from "../../../../(routes)/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import User from "@/app/_utils/models/user";
import Group from "@/app/_utils/models/group";
import dbConnection from "@/app/_utils/db/dbConnection";
import { redirect } from "next/navigation";


export default async function Messages() {
    await dbConnection()
    const session = await getServerSession(authOptions)
    if (!session) {
        return redirect("/signin")
    }
    const commUserData = await User.findById(session.user.id)
        .populate(
            [
                {
                    path: 'groups', model: Group,
                },
                {
                    path: 'groupRequests', model: Group
                },
            ]
        )
        .populate("groups")
        .populate("groupRequests")
        .populate("connections")
        .populate("connectionRequests")
        .exec()


    


    const connectionData = commUserData
        .connections.map((connection: any) => {
            return ({
                username: connection.username,
                profile: connection.profile,
            })
        })

    const connectionRequestData = commUserData
        .connectionRequests.map((request: any) => {
            return ({
                username: request.username,
                profile: request.profile
            })
        })

    const userConnectionData = [...connectionData, ...connectionRequestData]

    const userGroupData = commUserData.groups.map((group: any) => group.groupName)

    console.log(userGroupData)


    return (
        <ContentWrapper className={styles.container}>
            <MessageClient session={session} userGroupData={userGroupData} userConnectionData={userConnectionData} />
        </ContentWrapper>
    )
}