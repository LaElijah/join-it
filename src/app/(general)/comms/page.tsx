

// Have a main page that allows user to 
// see their 

// notifications on right hand side, top block 
// communities, groups, private messages
// seperate communities from groups and private messages 
// 













// Add a proxy load balancer
// The load balancer directs my connection to a specific 
// websocket server

type message = {
    groupId: string,
    username: string,
    message: string,
    type: string,
}
import MessageInputs from "@/app/_components/elements/messageInputs";
import MessageBox from "@/app/_components/elements/messageBox";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";

export default async function Groups() {
    const session = await getServerSession(authOptions);



    return (
        <div>

           <MessageInputs />
            <MessageBox 
            username={session.user.username} 
            groupId="gate-1"
            message="Hello world"
            />

        </div>
    )
}