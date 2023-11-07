"use client"
import ScrollBar from "@/app/_components/scrollBar"
import styles from "@/app/_styles/components/messageClient.module.scss"
import { useState } from "react"
import MessageBody from "./elements/messageBody";


type OptionGroup = {
    label: string;
    options: string[];
};

interface MessageData {
    hostname: String;
    groupId: String;
    type: "message" | "handshake",
    history: any[],
}

interface DefaultComponentProps {
    setting: "default"
    allConnections: any[],
    createGroup: any,
    hostname: string
}

export default function MessageClient({
    session,
    userConnectionData,
    userGroupData }:
    {
        session: any,
        userConnectionData: any,
        userGroupData: any
    }) {

    const handleClick = async (groupName: string) => {

        const response = await fetch("/api/comms/messages", {
            method: "POST",
            body: JSON.stringify({
                groupName,
                username: session.user.username
            })
        })

        const data = await response.json()

        const { payload: { group: { _id: groupId, messages } } } = data

        setMessageData({
            hostname: session.user.username,
            groupId: groupId,
            type: 'message',
            history: [...messages]
        })

    }
    // Default data, displays connection and connections requests 
    // clickable to request a group or send use back to an already made group 
    const [messageData, setMessageData] = useState<MessageData | DefaultComponentProps>(
        {
            hostname: session.user.username,
            setting: "default",
            allConnections: userConnectionData,
            createGroup: async (users: string | string[]) => {
                const selectedUsers = (typeof users === "string")
                    ? [users]
                    : users

                const response = await fetch("/api/comms/groups", {
                    method: "POST",
                    body: JSON.stringify({ selectedUsers })
                })

                const { payload: { group: { _id: groupId, messages } } } = await response.json()
                setMessageData({
                    hostname: session.user.username,
                    groupId: groupId,
                    type: 'message',
                    history: [...messages]
                })

            }
        }
    )

    const options: OptionGroup[] = [
        {
            label: "Your chats",
            options: userGroupData,
            // TODO: Add a scroll bar and a max height for the group size 
        },
    ];

    return (
        <div className={styles.container}>
            <ScrollBar
                session={session}
                options={options}
                data={messageData}
                element={MessageBody}
                onClick={handleClick}
            />
        </div>

    )
}