"use client"
import styles from "@/app/_styles/elements/messageDisplay.module.scss"
import MessageBubble from '@/app/_components/elements/messageBubble'
import MessageBar from "@/app/_components/elements/messageBar"
import { useEffect } from "react";


export default function MessageDisplay({ messages, hostname, type }: any) {
   


    // {
    //     "groupId": "hash",
    //     "message": "hi",
    //     "sender": "admin",
    //     "receiver": "admin",
    //     "type": "message",
    //     "timestamp": "Sat Nov 04 2023 08:53:01 GMT-0500 (Central Daylight Time)"
    //   }

    useEffect(() => {
        const chatList = document.getElementById("chatList");
        if (chatList) chatList.scrollTop = chatList.scrollHeight;
    }, [messages])


    return (
        <main id={"chatList"} className={styles.container}>
            {messages.map((element: any, index: number) => {
                if (type === "bubble") return <MessageBubble key={index + element.sender} hostname={hostname} message={element} />
                else if (type === "bar") return <MessageBar key={index + element.sender} hostname={hostname} message={element} />
            })}
        </main>
    )
}