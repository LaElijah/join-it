type MessageData = {
  hostname: string;
  groupId: string;
  type?: "message" | "handshake",
  history: any[],
  groupName: string;
}



function EventHeader() {
  return (
    <header>
      hi
    </header>
  )
}

function AltTabs({ subGroups }: { subGroups: any[] }) {

  return (
    <div>
      {subGroups.map((group: any) => {
        return (
          <div key={group.name}>
            {group.name}
          </div>
        )
      })}
    </div>
  )
}

import styles from "@/app/_styles/components/communityClient.module.scss"
import MessageBody from "@/app/_components/elements/messageBody";


export default function CommunityClient({ initialData, session, subGroups }: { initialData: MessageData, session: any, subGroups: any[] }) {
  return (
    <div className={styles.container}>
      <EventHeader />

      <section>

        <AltTabs subGroups={subGroups} />

        <MessageBody
          data={initialData}
          session={session}
          type="bar"
        />

      </section>

    </div>
  )
}
