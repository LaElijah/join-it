
import styles from "@/app/_styles/elements/messageDisplay.module.scss"

export default function MessageDisplay({ messages}: any) {

    return (
        <main className={styles.container}>
            {messages.map((element: any) => {
                return <h2 key={element.message}>{element.message}</h2>
            })}
        </main>
    )
}