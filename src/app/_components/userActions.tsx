

"use client"
import { Button } from "@mantine/core"
import { useState } from "react"


export default function UserActions({username, isFollowing}: any) {

    
    const [followStatus, setFollowStatus] = useState(isFollowing)
    const [loading, setLoading] = useState(false)

    const handleAction = async () => {
        setLoading(true)
        const response = await fetch('/api/comms/user', {
            method: "PUT",
            body: JSON.stringify({
                user: username,
            })
        })

        const data = await response.json()
        if (data.status === "success") setFollowStatus(data.payload.isFollowing) 
        
        setLoading(false)
    }   
    return (
        <div>
            <h2>{username}</h2>
            <Button loading={loading} onClick={handleAction}>{followStatus ? "Unfollow" : "Follow" }</Button>
            </div>
    )
} 