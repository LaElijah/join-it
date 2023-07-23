"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"




export default function Register() {

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")

    const [status, setStatus] = useState("")

    const router = useRouter()

    async function register() {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({ username: name, password: password, passwordConfirm: passwordConfirm })
        })
        const data = await response.json()
        setStatus(data.status)
        if (data.status === "success") {
            router.push("/")
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col items-center justify-center w-1/3">
                <h1 className="text-4xl font-bold">Register</h1>
                <input className="border-2 border-black rounded-lg p-2 m-2" type="text" placeholder="Username" onChange={(e) => setName(e.target.value)} />
                <input className="border-2 border-black rounded-lg p-2 m-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <input className="border-2 border-black rounded-lg p-2 m-2" type="password" placeholder="Confirm Password" onChange={(e) => setPasswordConfirm(e.target.value)} />
                <button className="border-2 border-black rounded-lg p-2 m-2" onClick={register}>Register</button>
                {status === "failure" ? <p className="text-red-500">Registration failed</p> : null}
            </div>
        </div>
    )
}
