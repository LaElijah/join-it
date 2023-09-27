"use client"

import { Button, Stack, TextField} from "@mui/material";

import { useState } from "react";


export default function InputBoxes() {

    const [name, setName] = useState("")
    const [request, setRequest] = useState("")

    async function handleSubmit() {
        await fetch('/api/resources', {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                date: new Date(),
                resource: request
            })
        })
    }
    

    const handleChange = (event: any) => {
            
            if (event.target.id === "name") {
                setName(event.target.value)
            }
            else if (event.target.id === "request") {
                setRequest(event.target.value)
            }
    }

    return (
        <Stack>
                <TextField onChange={handleChange} id="name" label="Name" variant="outlined" value={name} />
                <TextField onChange={handleChange} label="Request details" id="request" variant="outlined" multiline minRows={4} value={request} />
                <Button onClick={handleSubmit} color="primary">Submit Resource</Button>
            </Stack>
    )

}