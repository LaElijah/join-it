"use client"
import ScrollBar from "@/app/_components/scrollBar"
type OptionGroup = {
    label: string;
    options: string[];
};

import MessageBody from "./messageBody";


export default async function MessageController({session}: any) {

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
        username: "test"
    }


    return (
        <div>
            <ScrollBar session={session} options={options}
            element={MessageBody} 
            data={data}
            />

        </div>
    )
}