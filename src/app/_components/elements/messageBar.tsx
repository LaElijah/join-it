import styles from "@/app/_styles/elements/messageBar.module.scss"


export default function MessageBar({ message, hostname }: any) {

    const isHost = message.sender === hostname


    return (
        <div className={isHost ? styles.hostMessage : styles.message}>
            <p>{isHost ? "You" : message.sender}</p>
            <h3>{message.message}</h3>
        </div>
    )
}