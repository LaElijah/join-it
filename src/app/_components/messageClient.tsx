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
    username: String;
    groupId: String;
    type: "message" | "handshake",
    history: any[],


}

interface DefaultComponentProps {
    setting: "default"
    allConnections: any[]
}

export default function MessageClient({ session, userConnectionData, userGroupData }: { session: any, userConnectionData: any, userGroupData: any }) {

    // Default data, displays connection and connections requests 
    // clickable to request a group or send use back to an already made group 
    const [messageData, setMessageData] = useState<MessageData | DefaultComponentProps>(
        {
            setting: "default",
            allConnections: userConnectionData
        }
    )

    
    const options: OptionGroup[] = [
        {
            label: "Your chats",
            options: userGroupData,
            // TODO: Add a scroll bar and a max height for the group size 
        },
    ];

    const handleClick = async (groupName: string) => {
        const response = await fetch("/api/comms/messages", {
            method: "POST",
            body: JSON.stringify({
                groupName,
                username: session.user.username
            })
        })


        const data = await response.json() 

        const {payload: {group: {groupId, messages}}} = data
        console.log(groupId)


        setMessageData({
            username: session.user.username,
            groupId: groupId,
            type: 'message',
            history: [...messages]
        })
    }


    return (
        <div className={styles.container}>
            <ScrollBar
                session={session}
                options={options}
                element={MessageBody}
                data={messageData}
                onClick={handleClick}
            />

        </div>

    )
}