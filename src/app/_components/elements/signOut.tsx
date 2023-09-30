


"use client"
import { signOut } from "next-auth/react"



export default function SignOut({label = "Sign out"}: { label?: string }): React.ReactElement {

    return (
        <button onClick={() => signOut()} >
            {label}
        </button>
    )
}

