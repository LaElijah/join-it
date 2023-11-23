
"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Queue from "../../_utils/tools/Queue"
import MessageHeader from "./messageHeader"
import MessageDisplay from "@/app/_components/elements/messageDisplay"
import MessageActions from "./messageActions"
import styles from "@/app/_styles/components/messageBody.module.scss"
import { debounce } from "@/app/_utils/tools/debounce"



type MessageData = {
    hostname: string;
    groupId: string;
    type?: "message" | "handshake",
    history: any[],
    groupName: string;
}

export default function MessageBody(
    {
        data,
        session,
        type = "bubble"
    }: {
        data: MessageData,
        session: any,
        type?: string
    }) {

    const {
        groupId,
        history,
        hostname
    } = data

    const ws: any = useRef(null)
    const toggle = useRef(false)
    const messages = useMemo(() => new Queue(40, history), [groupId])
    
    const wsUrl = process.env.NODE_ENV !== "development"
        ? `wss://${process.env.NEXT_PUBLIC_EVENT_SERVICE_HOSTNAME}`
        : "ws://localhost:8080"

    const [message, setMessage] = useState("")
    const [currentMessages, setCurrentMessages] = useState<any>([...messages.queue])
    const [sending, setSending] = useState(false)

    useEffect(() => {
        let socket = new WebSocket(wsUrl)

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


        const timer = setInterval(async () => {
            if (ws.current.readyState === ws.current.CLOSED && groupId) {
                const response = await fetch("/api/comms/groups", {
                    method: "GET",
                    headers: {
                        "groupId": groupId,
                        "timestamp": `${new Date()}`
                    },
                    next: { revalidate: 0 }
                })

                const { payload: { newMessages } } = await response.json()
                messages.fill(newMessages)
                setCurrentMessages(messages.queue)
            }
        }, 30000)


        return () => {
            socket.close()
            clearInterval(timer)
        };

    }, [groupId, toggle.current])

    const handleMessage = () => {

        const payload = {
            message,
            groupId,
            sender: hostname,
            type: "message",
            timestamp: `${new Date()}`,
            metadata: JSON.stringify({
                profile: session.user.profile,
            })
        }
        ws.current.send(JSON.stringify(payload))
        messages.add(payload)

        setCurrentMessages(messages.queue)
        setMessage("")
        setSending(false)
    }

    const debouncedHandleMessage = debounce(handleMessage, 1000)

    const handleSend = () => {
        if (message !== "") {
            if (ws.current.readyState === ws.current.CONNECTING) {
                setSending(true)
                debouncedHandleMessage()
            }
            else {
                setSending(true)
                handleMessage()
            }
        }
    }

    return (
        <section className={styles.container}>
            <MessageHeader {...data} />

            <MessageDisplay
                messages={(currentMessages.length === 0) ? messages.queue : currentMessages}
                hostname={hostname}
                type={type}
            />


            <MessageActions
                onEnter={handleSend}
                value={message}
                onClick={() => {if (ws.current.readyState === ws.current.CLOSED) toggle.current = !toggle.current}}
                onChange={(event) => {
                    setMessage(event.target.value)
                    if (ws.current.readyState === ws.current.CLOSED) toggle.current = !toggle.current
                }}
            />

        </section>
    )
}








