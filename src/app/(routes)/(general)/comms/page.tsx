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
  groupId: string;
  username: string;
  message: string;
  type: string;
};
import MessageInputs from "@/app/_components/elements/messageInputs";
import MessageBox from "@/app/_components/elements/messageBox";
import { getServerSession } from "next-auth";
import authOptions from "@/app/(routes)/api/auth/[...nextauth]/options";
import ContentWrapper from "@/app/_components/contentWrapper";
import PeerComms from "@/app/_components/peerComms";
import CommunityComms from "@/app/_components/communityComms";
import TabGroup from "@/app/_components/elements/tabGroup";


export default async function Groups() {
  const session = await getServerSession(authOptions);
  const styles: any = "";

  const pages = new Map([
    ["Community", <CommunityComms/>],
    ["Peers", <PeerComms />]
  ])

  

  return (
    <ContentWrapper>
        <TabGroup tabs={[
          {
          key: "Community",
          label: "Community"
        },
        {
          key: "Peers",
          label: "Peers"
        }
        ]}>
          {pages}
        </TabGroup>

      {/* <MessageInputs />
            <MessageBox 
            username={session.user.username} 
            groupId="gate-1"
            message="Hello world"
            /> */}
    </ContentWrapper>
  );
}
