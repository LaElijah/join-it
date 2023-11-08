
"use client"

import { useEffect, useMemo, useRef, useState } from "react"

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
    const connect = useRef(false)

    const wsHost = process.env.EVENT_SERVICE_HOSTNAME || 'hostbus.crabdance.com'
    const ws: any = useRef(null)
   

    


    useEffect(() => {
        let socket = new WebSocket(`wss://${wsHost}`)
        
            socket.onopen = () => {
                console.log("open")
                socket.send(JSON.stringify({
                    sender: hostname,
                    groupId: groupId || "none",
                    type: "handshake",
                    message,
                    timestamp: `${new Date()}`,
                    metadata: JSON.stringify({
                        profile: session.user.profile
                    })
                }))

            }
        

            socket.onmessage = (response: { data: string }) => {
                const event = JSON.parse(response.data)

                if (event.type === "message") messages.add(event.payload)
                setCurrentMessages(messages.queue)

            }

            // ws.current.addEventListener("error", () => { console.log() })
            socket.onclose = () => {
                console.log("closed")
                if (ws.current.readyState === socket.CLOSED) {
                connect.current = !connect.current
                }
                
            }

            ws.current = socket

            // return () => {
            //     socket.close();
            //   };
           
            
            
        
    }, [data])


    useEffect(() => {
        window.location.reload()
    },[connect.current])

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
            ws.current.send("JSON.stringify(payload)")
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
