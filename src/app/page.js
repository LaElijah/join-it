import {  Stack } from "@mui/material";
import Link from "next/link"
import styles from "./styles/page.module.scss"


export default function Index() {

    return (
        <div className={styles.container}>

            <div className={styles.hero} >
                <h1>Join-It</h1>
                <h5>alpha Demo</h5>
                <h5>Version 0.1.0</h5>
                
            </div>


            


        <div className={styles.onboarding} >
            <h2>Thanks for trying the Join-It demo</h2>
            <h4>Make an account and visit the site!</h4>


                <Stack direction="row" spacing={2}>
                    <Link href="/signup">Sign up</Link>
                    <Link href="/api/auth/signin">Login</Link>
                </Stack>

            </div>

        </div>
    )
}