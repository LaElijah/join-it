
"use client"

import { useEffect, useMemo, useState } from "react"

import MessageActions from "./messageActions"
import Queue from "../_utils/tools/Queue"
import MessageDisplay from "@/app/_components/elements/messageDisplay"
import MessageHeader from "./elements/messageHeader"
import styles from "@/app/_styles/components/messageBody.module.scss"


export default function MessageBody({ data }: any) {
    const { username, groupId, type, history } = data
    const messages = useMemo(() => new Queue(40, history), [history])
    const [message, setMessage] = useState("")
    const [currentMessages, setCurrentMessages] = useState<any>([...messages.queue])



    // Custom data

    // WebSocket set up and actions 

    const hostname = process.env.EVENT_SERVICE_HOSTNAME || 'hostbus.crabdance.com'

    const ws: WebSocket = useMemo(() => new WebSocket(`wss://${hostname}`), [hostname]) 





    useEffect(() => {

        ws.addEventListener("open", (event: any) => {
            ws.send(JSON.stringify({
                payload: {
                    sender: username,
                    receiever: 'admin',
                    groupId,
                    type: "handshake",
                    message,
                    timestamp: `${new Date()}`
                },
                type: "handshake",
            }))

        })
        ws.addEventListener("error", (event) => {
            console.log(event)
        })

        window.addEventListener("unload", () => ws.close())
        window.addEventListener("beforeunload", () => ws.close())

        ws.addEventListener("message", (response) => {
            const event = JSON.parse(response.data)

            if (event.type === "message") messages.add(event.payload)
            console.log("render")
            setCurrentMessages(messages.queue)

        })
    }, [])

    const handleMessage = () => {
        const payload =  {
            sender: username,
            receiver: 'admin',
            groupId,
            type: "message",
            message,
            timestamp: `${new Date()}`
        }
        ws.send(JSON.stringify({payload}))
        messages.add(payload)
        setCurrentMessages(messages.queue)
        setMessage("")
        
    }

    const handleChange = (event: any) => {
        setMessage(event.target.value)
    }




    return (
        <section className={styles.container}>

            <MessageHeader {...data} />
            <MessageDisplay messages={currentMessages} />
            <MessageActions onEnter={handleMessage} value={message} onChange={handleChange} />

        </section>
    )
}
