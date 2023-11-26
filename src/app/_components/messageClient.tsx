"use client"
import ScrollBar from "@/app/_components/scrollBar"
import styles from "@/app/_styles/components/messageClient.module.scss"
import { useState } from "react"
import MessageController from "./elements/messageController";


type OptionGroup = {
    label: string;
    options: string[];
};

type MessageData = {
    hostname: String;
    groupId: String;
    type: "message" | "handshake",
    history: any[],
    groupName: string;
}

type DefaultComponentProps = {
    setting: "default"
    allConnections: any[],
    createGroup: any,
    hostname: string
}

type MessageBodyProps = MessageData | DefaultComponentProps;

export default function MessageClient(
    {
        session,
        userConnectionData,
        userGroupData
    }:
        {
            session: any,
            userConnectionData: any,
            userGroupData: any
        }) {

    const handleClick = async (name: string) => {
        const groupName = name.includes(",")
            ? name
            : `${name}${name.includes(session.user.username)
                ? ''
                : ',' + session.user.username
            }`


        const response = await fetch("/api/comms/groups", {
            method: "POST",
            body: JSON.stringify({
                groupName,
            })
        })

        const data = await response.json()

        const {
            payload: {
                group: { _id: groupId, messages }
            }
        } = data

        setMessageData({
            groupName: name,
            hostname: session.user.username,
            groupId: groupId,
            type: 'message',
            history: messages
        })


    }
    // Default data, displays connection and connections requests 
    // clickable to request a group or send use back to an already made group 
    const [messageData, setMessageData] = useState<MessageBodyProps>(
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
                    body: JSON.stringify({ selectedUsers }),
                })


                const {
                    payload:
                    { group:
                        { _id: groupId, messages, groupName }
                    }
                } = await response.json()

                setMessageData({
                    groupName: groupName,
                    hostname: session.user.username,
                    groupId: groupId,
                    type: 'message',
                    history: messages
                })

            }
        }
    )

    const options: OptionGroup[] = [
        {
            label: "Your chats",
            options: userGroupData
            // options: userGroupData,
            // TODO: Add a scroll bar and a max height for the group size 
        },
    ];

    return (
        <div className={styles.container}>
            <ScrollBar
                session={session}
                options={options}
                data={messageData}
                element={MessageController}
                onClick={handleClick}
            />
        </div>

    )
}