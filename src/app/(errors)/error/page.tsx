"use client"
import { useSearchParams, useRouter } from "next/navigation"
import styles from '@/app/_styles/functions/error.module.scss'
import { Button } from "@mantine/core"


export default function AuthError() {
    const searchParams = useSearchParams()
    const router = useRouter()

    const error = searchParams.get("error")
    let message
    switch (error) {
        case "Cannot read properties of null (reading 'auth')":
            message = "You are not signed in"
            break;
        case "jwt malformed":
            message = "Your session is invalid"
            break;
            
        case "jwt expired":
            message = "Your session has expired"
            break;
        default:
            message = "An unknown error has occurred"
            break;
    }

    return (
        <div className={styles.container}>

            <div className={styles.wrapper}>

            <h2>Auth Error</h2>

            <label>Error message</label>
            <p>{message || error}</p>

            <Button onClick={() => {
                router.push("/")
            }} >Go home</Button>

            </div>

        </div>
    )
}