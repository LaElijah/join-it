import authOptions from "@/app/(routes)/api/auth/[...nextauth]/options";
import CommunityClient from "@/app/_components/communityClient"
import dbConnection from "@/app/_utils/db/dbConnection";
import Group from "@/app/_utils/models/group"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

type MessageData = {
  hostname: string;
  groupId: string;
  type?: "message" | "handshake",
  history: any[],
  groupName: string;
}



export default async function Community({ params: { slug } }: { params: { slug: string } }) {
  await dbConnection()
  const session = await getServerSession(authOptions)
  const group = await Group.findOne({ groupName: slug })

  if (group.type === "messageGroup") return redirect("/messages")


  const initialData: MessageData = {
    hostname: session.user.username,
    groupId:  group.groupId,
    history: group.messages,
    groupName: group.groupName
  }

  const subGroups = [
    {name: "well"},
    {name: "hello"}
  ]

  return <CommunityClient initialData={initialData} session={session} subGroups={subGroups} />
}






// Have a main page that allows user to
// // see their

// // notifications on right hand side, top block
// // communities, groups, private messages
// // seperate communities from groups and private messages
// //

// // Add a proxy load balancer
// // The load balancer directs my connection to a specific
// // websocket server

// type message = {
//   groupId: string;
//   username: string;
//   message: string;
//   type: string;
// };
// import MessageInputs from "@/app/_components/elements/messageInputs";
// import MessageBox from "@/app/_components/elements/messageBox";
// import { getServerSession } from "next-auth";
// import authOptions from "@/app/(routes)/api/auth/[...nextauth]/options";
// import ContentWrapper from "@/app/_components/contentWrapper";
// import PeerComms from "@/app/_components/peerComms";
// import CommunityComms from "@/app/_components/communityComms";
// import TabGroup from "@/app/_components/elements/tabGroup";


// export default async function Groups() {
//   const session = await getServerSession(authOptions);
//   const styles: any = "";

//   const pages = new Map([
//     ["Community", <CommunityComms key="community" />],
//     ["Peers", <PeerComms key="peers" />]
//   ])

  

//   return (
//     <ContentWrapper>
//         <TabGroup tabs={[
//           {
//           key: "Community",
//           label: "Community"
//         },
//         {
//           key: "Peers",
//           label: "Peers"
//         }
//         ]}>
//           {pages}
//         </TabGroup>

//       {/* <MessageInputs />
//             <MessageBox 
//             username={session.user.username} 
//             groupId="gate-1"
//             message="Hello world"
//             /> */}
//     </ContentWrapper>
//   );
// }
