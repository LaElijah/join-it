
"use client"

import { useMemo, useState } from "react"

import MessageActions from "./messageActions"
import Queue from "../_utils/tools/Queue"
import MessageDisplay from "@/app/_components/elements/messageDisplay"
import MessageHeader from "./elements/messageHeader"
import styles from "@/app/_styles/components/messageBody.module.scss"

export default function MessageBody({ data }: any) {
    const [message, setMessage] = useState("")

    const { username, groupId, type, history } = data
    const messages = useMemo(() => new Queue(40, history), [history])
        // Custom data

        // WebSocket set up and actions 
        const ws: WebSocket = useMemo(() => new WebSocket(`ws://${process.env.EVENT_SERVICE_HOSTNAME || 'localhost'}`), [process.env.EVENT_SERVICE_HOSTNAME])
        
        
        ws.addEventListener("open", (event: any) => {
            
            ws.send(JSON.stringify({
                payload: {
                    username,
                    groupId,
                    type: 'handshake',
                    message: `client "${username}" connected`
                },
                type: "handshake",
            }))

        })

        ws.addEventListener("message", (event) => {
            console.log(JSON.parse(event.data))
        })

        const handleMessage = () => {
            ws.send(JSON.stringify({
                payload: {
                    username,
                    groupId,
                    type: "message",
                    message
                },
                type,

            }))
            messages.add({
                message
            })
            setMessage("")
        }

        const handleChange = (event: any) => {
            setMessage(event.target.value)
        }



        return (
            <section className={styles.container}>
                
                <MessageHeader {...data} />
                <MessageDisplay messages={messages.queue} />
                <MessageActions onEnter={handleMessage} value={message} onChange={handleChange} />

            </section>
        )
    }
