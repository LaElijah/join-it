import styles from "@/app/_styles/elements/messageBubble.module.scss"


export default function MessageBubble({ message, hostname }: any) {
    console.log(message)
    if (message.sender === hostname) {
        return (
            <div  className={styles.hostMessage}>

                <div>
                </div>

                <div>
                    <main>
                        <p>you</p>
                        <h3>{message.message}</h3>
                    </main>

                    <footer>

                    </footer>
                </div>

            </div>
        )

    }
    else {
        return (
            <div className={styles.message}>

                <div>
                </div>

                <div>
                    <main>
                        <p>{message.sender}</p>
                        <h3>{message.message}</h3>
                    </main>

                    <footer>

                    </footer>
                </div>

            </div>
        )
    }
}
