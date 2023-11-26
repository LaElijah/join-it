import styles from "@/app/_styles/elements/messageBubble.module.scss"


export default function MessageBubble({ message, hostname }: any) {

    const isHost = message.sender === hostname
    
    return (
        <div className={isHost ? styles.hostMessage : styles.message}>

            <header>
            </header>

            <main>
                <p>{message.message}</p>
            </main>

            <footer>
                <p>{isHost ? "You" : message.sender}</p>
            </footer>

        </div>
    )

}