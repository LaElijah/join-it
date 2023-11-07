import styles from "@/app/_styles/elements/messageBubble.module.scss"


export default function MessageBubble({ message, hostname }: any) {
    
    const isHost = message.sender === hostname
        return (
            <div  className={isHost ? styles.hostMessage : styles.message}>

                <div>
                </div>

                <div>
                    <main>
                        <p>{isHost ? "You" : message.sender}</p>
                        <h3>{message.message}</h3>
                    </main>

                    <footer>

                    </footer>
                </div>

            </div>
        )

    }