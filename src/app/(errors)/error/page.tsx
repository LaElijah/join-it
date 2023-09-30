"use client"
import { useSearchParams } from "next/navigation"
import styles from '@/app/_styles/functions/error.module.scss'
import { Button } from "@mantine/core"
import Link from "next/link"

export default function AuthError() {
    const searchParams = useSearchParams()
    const error = searchParams.get("error")

    let message
    switch (error) {
        case "Cannot read properties of null (reading 'auth')":
            message = "You are not signed in, please check your credentials and try again"
            break;
        case "jwt malformed":
            message = "Your session is invalid, please sign in again"
            break;
            
        case "jwt expired":
            message = "Your session has expired, please sign in again"
            break;
        default:
            message = "An unknown error has occurred"
            break;
    }

    return (
        <div className={styles.container}>

            <div className={styles.wrapper}>

            <h2>Login Error</h2>

            <label>Error message</label>
            <p>{message || error}</p>

            <Link href="/signin">
                Sign in
            </Link>

            </div>

        </div>
    )
}