
"use client"

import { useEffect, useMemo, useState } from "react"

import MessageActions from "./messageActions"
import Queue from "../../_utils/tools/Queue"
import MessageDisplay from "@/app/_components/elements/messageDisplay"
import MessageHeader from "./messageHeader"
import styles from "@/app/_styles/components/messageBody.module.scss"
import User from "../../_utils/models/user"


export default function MessageBody({ data, session }: any) {
    const { username, groupId, type, history } = data
    console.log("my history", history)
    const messages = useMemo(() => new Queue(40, history), [data])
    const [message, setMessage] = useState("")
    const [currentMessages, setCurrentMessages] = useState<any>([...messages.queue])
    const [selectedUsers, setSelectedUsers] = useState<string[]>([])


    useEffect(() => {
        ws.addEventListener("open", (event: any) => {
            ws.send(JSON.stringify({
                sender: username,
                receiever: 'admin',
                groupId,
                type: "handshake",
                message,
                timestamp: `${new Date()}`,
                metadata: JSON.stringify({
                    profile: session.user.profile
                })
            }))

        })

        ws.addEventListener("message", (response) => {
            const event = JSON.parse(response.data)

            if (event.type === "message") messages.add(event.payload)
            setCurrentMessages(messages.queue)

        })
        ws.addEventListener("error", (event) => { console.log() })
        ws.addEventListener("close", (event) => ws.close())
        window.addEventListener("unload", () => ws.close())
    }, [])

    // Custom data
    // WebSocket set up and actions 
    const hostname = process.env.EVENT_SERVICE_HOSTNAME || 'hostbus.crabdance.com'
    const ws: WebSocket = useMemo(() => new WebSocket(`wss://${hostname}`), [hostname])


    if (data.setting !== "default") {

        const handleMessage = () => {
            const payload = {
                sender: username,
                receiver: 'admin',
                groupId,
                type: "message",
                message,
                timestamp: `${new Date()}`,
                metadata: JSON.stringify({
                    profile: '',

                })
            }
            ws.send(JSON.stringify({ ...payload }))
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
                <MessageDisplay messages={(currentMessages.length === 0) ? messages.queue : currentMessages} username={username} />
                <MessageActions onEnter={handleMessage} value={message} onChange={(event) => setMessage(event.target.value)} />

            </section>
        )
    }
    else {

        


        const createGroup = async ({ selectedUsers }: { selectedUsers: string[] }) => {
            const response = await fetch("/api/comms/groups", {
                method: "POST",
                body: JSON.stringify({
                    hostUser: session.user.username,
                    selectedUsers
                })
            })

            const data = await response.json()
            console.log(data)

        }

        const handleSelectedUsers = (value: any) => {
            if (selectedUsers.find((user: string) => value === user)) {
                setSelectedUsers(current => current.slice(current.indexOf(value), 1))
            } else {
                setSelectedUsers(current => [value, ...current])
            }
        }


        return (
            <section>
                <button onClick={() => createGroup({
                    selectedUsers
                })}>
                    Select
                </button>

                {data.allConnections.map((connect: any) => (
                    <div onClick={() => handleSelectedUsers(connect.username)} >
                    <h3 >{connect.username}</h3>
                    </div>
                ))}

                {selectedUsers.length}

                

            </section>
        )
    }
}
