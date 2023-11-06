
import styles from "@/app/_styles/elements/messageDisplay.module.scss"
import MessageBubble from '@/app/_components/elements/messageBubble'


export default function MessageDisplay({ messages, username }: any) {

    // {
    //     "groupId": "hash",
    //     "message": "hi",
    //     "sender": "admin",
    //     "receiver": "admin",
    //     "type": "message",
    //     "timestamp": "Sat Nov 04 2023 08:53:01 GMT-0500 (Central Daylight Time)"
    //   }
    
    return (
        <main className={styles.container}>
            {messages.map((element: any, index: number) => {
                return <MessageBubble key={index + element.sender} hostname={username} message={element} />
            })}
        </main>
    )
}