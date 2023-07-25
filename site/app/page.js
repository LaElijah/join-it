import { Button, Stack, TextField } from "@mui/material";
import Link from "next/link"


export default function Index() {

    return (
        <div>

            <h2>Welcome to the Join-it Demo!</h2>
            <h4>Choose the page you would like to visit</h4>

            <Stack direction="column" spacing={2}>
                <Link href="/requests">Requests</Link>
                <Link href="/resources">Resources</Link>
            </Stack>



        </div>
    )
}