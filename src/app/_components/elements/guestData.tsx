"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"


export default function GuestData() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const getCredentials = async () => {
        try {
            const response = await fetch("/api/auth/guest")
            const data = await response.json()

            const { username, password } = data.payload

            setUsername(username)
            setPassword(password)
        }
        catch (error) {
            console.log(error)

        }
    }

    if (username !== "" && password !== "") {
        return (
            <>


                <h2>Username: {username}</h2>
                <h2>Password: {password}</h2>

                <h3>
                    Your credentials will last for 7 days.
                </h3>


                <button onClick={() =>
                    signIn("credentials",
                     {
                        username,
                        password,
                        callbackUrl: "/",
                    }
                    )} >
                        Sign in
                </button>
            </>
        )
    } else {
        return (
            <>

            <h2>Click the button below to generate your account details.</h2>

            <button onClick={async () => await getCredentials()}>Generate credentials</button>
            </>
        )
    }
}