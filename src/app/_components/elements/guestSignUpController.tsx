"use client"

import { useState } from "react"
import { IconChevronLeft } from '@tabler/icons-react';
import styles from "@/app/_styles/pages/guest.module.scss"

export default function GuestSignUpContoller({ children }: any) {
    const [page, setPage] = useState(0)

    return (
        <>
            {(page === 1) && (
                <div className={styles.header}>
                    <IconChevronLeft onClick={() => setPage(0)}/>
                </div>
            )}

            {children.get(page)}

            {(page === 0) && (
                <button onClick={() => setPage(1)}>Try the site</button>
            )}
        </>

    )
}
