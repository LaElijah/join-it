"use client"

import styles from "../styles/functions/error.module.scss"
import { useRouter } from "next/navigation"

export default function FallbackError() {
    const router = useRouter()

    return (
        <div className={styles.container}>

            <div className={styles.wrapper}>

                <h2>Auth Error</h2>

                <label>Error message</label>
                <p>Error</p>

                <button onClick={() => {
                    router.push("/")
                }} >Go home</button>

            </div>
        </div>
    )
}