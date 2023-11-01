import ContentWrapper from "@/app/_components/contentWrapper";
import MessageController from "@/app/_components/messageController";
import MessageBody from "@/app/_components/messageBody";

import authOptions from "../../../../(routes)/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";


export default async function Messages() {
    const session = await getServerSession(authOptions)


    return (
        <ContentWrapper>
            <MessageController session={session} />

            <MessageBody />
        </ContentWrapper>
    )
}