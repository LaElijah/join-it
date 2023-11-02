"use client"
import ScrollBar from "@/app/_components/scrollBar"
import styles from "@/app/_styles/components/messageController.module.scss"
type OptionGroup = {
    label: string;
    options: string[];
};

import MessageBody from "./messageBody";


export default function MessageController({session}: any) {

    const options: OptionGroup[] = [
        {
            label: "Your chats",
            options: ["Details", "Customization"], // Change this to a map function 
            // Add a scroll bar and a max height for the group size 
        },
        {
            label: "More",
            options: ["Deactivate", "Help & Feedback"],
        },
    ];

    const data = {
        username: session.user.username,
        groupId: 'hash',
        type: 'message',
        history: [
            {
                message: "can you see me here?"
            }
        ]
    }


    return (
        <div className={styles.container}>
            <ScrollBar 
            
            session={session} 
            options={options}
            element={MessageBody} 
            data={data}
            />

        </div>
    )
}