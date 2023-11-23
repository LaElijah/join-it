import MessageBody from "./messageBody"
import MessageSelector from "./messageSelector"

type MessageData = {
    hostname: string;
    groupId: string;
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

const isMessageData = (data: MessageData): data is MessageData => {
    return (
        "hostname" in data
        && "groupId" in data
        && "type" in data
        && "history" in data
        && "groupName" in data
    )
}

type MessageBodyProps = MessageData & DefaultComponentProps;


export default function MessageController(
    {
        data,
        session
    }: {
        data: MessageBodyProps,
        session: any
    }): JSX.Element {


    if (isMessageData(data)) return <MessageBody data={data} session={session} />
    else return <MessageSelector data={data} />
}
