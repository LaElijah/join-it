
"use client"

import { useMemo, useState } from "react"

import MessageActions from "./messageActions"
import Queue from "../_utils/tools/Queue"

export default function MessageBody({ data }: any) {
    const [message, setMessage] = useState("")
    const [ancient, setAncient] = useState<any[]>([])
    

    const { username, groupId, type, history } = data
    const messages = new Queue(40, history)
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
                    type,
                    message
                },
                type,

            }))
            messages.add({
                message
            })
            setAncient(messages.queue)
            setMessage("")
        }

        const handleChange = (event: any) => {
            setMessage(event.target.value)
        }



        return (
            <section>
                <div>
                {username}
                <h2>Hi</h2>
                {JSON.stringify(ancient, undefined, 2)}
                </div>

                <MessageActions onEnter={handleMessage} value={message} onChange={handleChange} />
            </section>
        )
    }
