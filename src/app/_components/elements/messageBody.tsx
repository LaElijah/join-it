
"use client"

import { useEffect, useMemo, useState } from "react"

import MessageActions from "./messageActions"
import Queue from "../../_utils/tools/Queue"
import MessageDisplay from "@/app/_components/elements/messageDisplay"
import MessageHeader from "./messageHeader"
import styles from "@/app/_styles/components/messageBody.module.scss"


export default function MessageBody({ data, session }: any) {
    const { hostname, groupId, type, history, createGroup } = data
    const messages = useMemo(() => new Queue(40, history), [data])
 



    const [message, setMessage] = useState("")
    const [multiSelect, setMultiSelect] = useState(false)
    const [currentMessages, setCurrentMessages] = useState<any>([...messages.queue])
    const [selectedUsers, setSelectedUsers] = useState<string[]>([])

    const wsHost = process.env.EVENT_SERVICE_HOSTNAME || 'hostbus.crabdance.com'
    const ws: WebSocket = useMemo(() => new WebSocket(`wss://${wsHost}`), [wsHost, groupId])


    function heartbeat(ws: any) {
        clearTimeout(ws.pingTimeout);
        ws.pingTimeout = setTimeout(() => {
          ws.terminate();
        }, 30000 + 1000);
      }


    useEffect(() => {
          
            ws.addEventListener("open", (event: any) => {
                ws.send(JSON.stringify({
                    sender: hostname,
                    groupId: groupId || "none",
                    type: "handshake",
                    message,
                    timestamp: `${new Date()}`,
                    metadata: JSON.stringify({
                        profile: session.user.profile
                    })
                }))

            })
        

            ws.addEventListener("message", (response: { data: string }) => {
                const event = JSON.parse(response.data)

                if (event.type === "message") messages.add(event.payload)
                setCurrentMessages(messages.queue)

            })

            ws.addEventListener("error", () => { console.log() })
            ws.addEventListener("close", () => console.log("closed"))
           
            
            
        
    }, [data])

    // Custom data
    // WebSocket set up and actions 
   
    if (data.setting !== "default") {


        const handleMessage = () => {
            
            const payload = {
                message,
                groupId,
                sender: hostname,
                type: "message",
                timestamp: `${new Date()}`,
                metadata: JSON.stringify({
                    profile: '',
                })
            }
            ws.send(JSON.stringify(payload))
            messages.add(payload)

            setCurrentMessages(messages.queue)
            setMessage("")

        }

        // const handleChange = (event: any) => {
        //     setMessage(event.target.value)
        // }
        return (
            <section className={styles.container}>

                <MessageHeader {...data} />
                <MessageDisplay messages={(currentMessages.length === 0) ? messages.queue : currentMessages} hostname={hostname} />
                <MessageActions onEnter={handleMessage} value={message} onChange={(event) => setMessage(event.target.value)} />

            </section>
        )
    }
    else {





        const handleSelectedUsers = (value: any) => {
            if (selectedUsers.find((user: string) => value === user)) {
                setSelectedUsers(current => current.splice(current.indexOf(value), 1))
            } else {
                setSelectedUsers(current => [value, ...current])
            }
        }


        const handleUserClick = multiSelect ? handleSelectedUsers : createGroup

        return (
            <section>
                <button onClick={() => setMultiSelect(!multiSelect)}>
                    Select multiple
                </button>


                <button onClick={() => multiSelect ? createGroup(selectedUsers) : undefined}>
                    Create group
                </button>

                {data.allConnections.map((connect: any) => (
                    <div key={connect.username} onClick={() => handleUserClick(connect.username)} >
                        <h3 >{connect.username}</h3>
                    </div>
                ))}

                {JSON.stringify(selectedUsers, null, 4)}
                <h3>Is multi: {multiSelect ? "true" : "false"}</h3>



            </section>
        )
    }
}
