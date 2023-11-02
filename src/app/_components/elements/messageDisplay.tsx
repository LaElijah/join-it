
import styles from "@/app/_styles/elements/messageDisplay.module.scss"

export default function MessageDisplay({ messages}: any) {
    console.log(messages)

    return (
        <main className={styles.container}>
            {messages.map((element: any) => {
                return <h2 key={element.message}>{element.message}</h2>
            })}
        </main>
    )
}