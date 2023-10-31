

"use client"
import { Button } from "@mantine/core"
import { useState } from "react"

const getFollowLabel = (status: string) => {
    switch (status) {
        case "YES":
            return "Unfollow"
        case "PENDING":
            return "Pending request"
        case "NO":
            return "Follow"
        default: return "Error"
    }

}

export default function FollowButton({ username, isConnected }: any) {



    const [followStatus, setFollowStatus] = useState<string>(getFollowLabel(isConnected))
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
        if (data.status === "success") setFollowStatus(getFollowLabel(data.payload.isConnected))

        setLoading(false)
    }
    return  <Button loading={loading} onClick={handleAction}>{followStatus}</Button>
} 