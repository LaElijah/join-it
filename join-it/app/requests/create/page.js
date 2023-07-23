"use client"

import { Button, Stack, TextField} from "@mui/material";

import { useState } from "react";

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation';




export default function CreateRequests() {

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/signin")
        }
    }
    )


    const [name, setName] = useState("")
    const [request, setRequest] = useState("")

    async function handleSubmit() {
        await fetch('/api/requests', {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                date: new Date(),
                request: request
            })
        })
    }
    

    const handleChange = (event) => {
            
            if (event.target.id === "name") {
                setName(event.target.value)
            }
            else if (event.target.id === "request") {
                setRequest(event.target.value)
            }
    }

    return (
        <div>
            <h2>Make a request</h2>
            <Stack>
                <TextField onChange={handleChange} id="name" label="Name" variant="outlined" value={name} />
                <TextField onChange={handleChange} label="Request details" id="request" variant="outlined" multiline minRows={4} value={request} />
                <Button variant="filled" onClick={handleSubmit} color="primary">Submit Resource</Button>
            </Stack>
        </div>
    )
}