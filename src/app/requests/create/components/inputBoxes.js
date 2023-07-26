"use client"

import { Button, Stack, TextField} from "@mui/material";

import { useState } from "react";


export default function InputBoxes(props) {

    const [resource, setResource] = useState("")
    const [goal, setGoal] = useState("")
    const [category, setCategory] = useState("")
    const [details, setDetails] = useState("")


    async function handleSubmit() {
        await fetch('/api/requests', {
            method: 'POST',
            body: JSON.stringify({
                username: props.session.user.username,
                date: new Date(),
                resource: resource,
                goal: goal,
                category: category,
                details: details

            })
        })
    }
    

    const handleChange = (event) => {
            
            if (event.target.id === "resource") {
                setResource(event.target.value)
            }
            else if (event.target.id === "details") {
                setDetails(event.target.value)
            }
            else if (event.target.id === "goal") {
                setGoal(event.target.value)
            }
            else if (event.target.id === "category") {
                setCategory(event.target.value)
            }
    }

    return (
        <Stack>
                
                <label>Resource</label>
                <TextField onChange={handleChange} id="resource" label="Resource" variant="outlined" multiline minRows={4} value={resource} />
                
                <label>Details</label>
                <TextField onChange={handleChange} id="details" label="details" variant="outlined" value={details} />
                
                <label>Goal</label>
                <TextField onChange={handleChange} id="goal" label="Goal"  variant="outlined" multiline minRows={4} value={goal} />
                
                <label>Category</label>
                <TextField onChange={handleChange} id="category" label="Category" variant="outlined" value={category} />
                
                <Button variant="filled" onClick={handleSubmit} color="primary">Submit Resource</Button>
            </Stack>
    )

}