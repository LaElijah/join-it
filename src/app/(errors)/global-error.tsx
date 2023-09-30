"use client"

import styles from "@/app/_styles/functions/error.module.scss"
import Link from "next/link"
import { useEffect } from "react"

export default function GlobalError({ error, reset }: {
    error: Error,
    reset: () => void
}) {

    useEffect(() => {
        console.log(error)
    }, [error])

    return (
        <div className={styles.container}>
            

                <div className={styles.wrapper}>

                    <h2>Something went wrong!</h2>

                    
                    <button onClick={reset} >Try Again</button>
                    <Link href="/">Go Home</Link>

                </div>

        

        </div>
    )
}