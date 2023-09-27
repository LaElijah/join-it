
import { Stack } from "@mui/material"
import styles from '@/app/styles/components/list.module.scss'
import Link from "next/link"

// TODO: Extract styles to a separate file
export default function RequestsHeader() {






    return (
        <Stack
            direction="column"
            className={styles.filterBody}  >

            <div className={styles.linkBody}>
                <h2>Current Requests</h2>
                <Link href={"/requests/create"} >Request a resource</Link>
            </div>



        </Stack>
    )
}