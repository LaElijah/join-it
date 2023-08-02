"use client"

import { Stack } from "@mui/material";
import Link from "next/link"
import { Button, TextInput } from "@mantine/core";
import { signIn } from "next-auth/react"

import styles from "./credentialsInput.module.scss"
import { useState } from "react";

export default function CredentialsInput() {
    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")



    const handleChange = (event) => {
        if (event.target.name === "username") {
            setUsername(event.target.value)
        } else if (event.target.name === "password") {
            setPassword(event.target.value)
        }
    }



    const handleSubmit = (event) => {
        event.preventDefault()
        
        signIn("credentials", {
            username,
            password,
            callbackUrl: "/",
        })
    }

    


    return (
        <div className={styles.container} >
                    <TextInput onChange={handleChange} name="username" label="Username" placeholder={"Enter your username..."} />
        
                    <TextInput onChange={handleChange} name="password" label="Password" placeholder={"Enter your password..."}  />
               
                <Button className={styles.button} onClick={handleSubmit}> Sign in</Button>

        </div>
    )
}