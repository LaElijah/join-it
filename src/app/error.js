"use client"
import { useRouter } from "next/navigation"

import styles from "./error.module.scss"

export default function IndexError() {
    const router = useRouter()

    return (
        <div className={styles.container}>
            

                <div className={styles.wrapper}>

                    <h2>Auth Error</h2>

                    <label>Error message</label>
                    <p>Error</p>

                    <Button onClick={() => {
                        router.push("/")
                    }} >Go home</Button>

                </div>

        

        </div>
    )
}