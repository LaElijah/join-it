"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Queue from "../../_utils/tools/Queue"
import MessageHeader from "./messageHeader"
import MessageDisplay from "@/app/_components/elements/messageDisplay"
import MessageActions from "./messageActions"
import styles from "@/app/_styles/components/messageBody.module.scss"
import { debounce } from "@/app/_utils/tools/debounce"

export default function MessageBody(
    {
        data,
        session
    }: any) {

    const {
        hostname,
        groupId,
        history,
        createGroup,
    } = data
    const ws: any = useRef(null)
    const toggle = useRef(false)
    console.log("premessages", history)
    const messages = useMemo(() => new Queue(40, history), [groupId])
    console.log("messages", messages.queue)
    const wsHost = process.env.NEXT_PUBLIC_EVENT_SERVICE_HOSTNAME

    const [message, setMessage] = useState("")
    const [multiSelect, setMultiSelect] = useState(false)
    const [currentMessages, setCurrentMessages] = useState<any>([...messages.queue])
    const [selectedUsers, setSelectedUsers] = useState<string[]>([])
    const [sending, setSending] = useState(false)





    useEffect(() => {
        let socket: any = new WebSocket(`wss://${wsHost}`)

        socket.onopen = () => {
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

        socket.onclose = () => {
            console.log("CLOSED")
        }

        ws.current = socket

        setInterval(async () => {
            if (ws.current.readyState === ws.current.CLOSED) {
                const response = await fetch("api/comms/groups", {
                    method: "GET",
                    headers: {
                        "groupId": groupId
                    },
                    next: {revalidate: 0}
                })

                const { payload: { newMessages } } = await response.json()
                messages.fill(newMessages)
                setCurrentMessages(messages.queue)
            }
        }, 30000)

        return () => socket.close();

    }, [groupId, toggle.current])


    if (groupId) {

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
            ws.current.send(JSON.stringify(payload))
            messages.add(payload)

            setCurrentMessages(messages.queue)
            setMessage("")
            setSending(false)
        }

        const debouncedHandleMessage = debounce(handleMessage, 3000)

        const handleSend = () => {
            if (ws.current.readyState === ws.current.CONNECTING) {
                setSending(true)
                debouncedHandleMessage()
            }
            else {
                setSending(true)
                handleMessage()
            }
        }


        return (
            <section className={styles.container}>

                <MessageHeader {...data} />
                <MessageDisplay messages={(currentMessages.length === 0) ? messages.queue : currentMessages} hostname={hostname} />
                <MessageActions onEnter={handleSend} value={message} onChange={(event) => {
                    setMessage(event.target.value)
                    if (ws.current.readyState === ws.current.CLOSED) toggle.current = !toggle.current
                }}
                />
            </section>
        )
    }
    else {


        const handleSelectedUsers = (value: any) => {

            if (selectedUsers.find((user: string) => value === user)) {
                setSelectedUsers(current => current.splice(current.indexOf(value), 1))
            } 
            
            else {
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
