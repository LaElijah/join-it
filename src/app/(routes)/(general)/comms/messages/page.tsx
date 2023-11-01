import ContentWrapper from "@/app/_components/contentWrapper";
import MessageController from "@/app/_components/messageController";
import styles from "@/app/_styles/pages/messages.module.scss"
import authOptions from "../../../../(routes)/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";


export default async function Messages() {
    const session = await getServerSession(authOptions)


    return (
        <ContentWrapper className={styles.container}>
            <MessageController session={session} />
        </ContentWrapper>
    )
}