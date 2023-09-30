"use client"
import { TextInput, Indicator, Button } from "@mantine/core"
import styles from "@/app/_styles/elements/usernameInput.module.scss"
import { useEffect } from "react";
import { useDebouncedValue } from "@mantine/hooks"




export default function UsernameInput(props: any) {


    const { state, dispatch } = props

    const { username } = state

    const [searchUserName] = useDebouncedValue(username, 300)


    async function usernameExists() {


        const response = await fetch(`api/auth/confirmUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: searchUserName })
        })
        const data = await response.json()
        dispatch({ name: "usernameExists", payload: data.exists })

    }


    useEffect(() => {
        const updateValidity = async () => {
            await usernameExists()
        }
        updateValidity()
    }, [searchUserName, dispatch])







    return (

        <div className={styles.container} >
            <Indicator
                position={"bottom-end"}
                color={(state.usernameExists ? "red" : "green")}
            >
                <TextInput
                    description={(state.usernameExists) ? "Username already exists!" : ""}
                    error={state.usernameExists}
                    value={username}
                    placeholder={"Enter your username..."}
                    onChange={(event) => {

                        dispatch({ name: "username", payload: event.target.value.replace(/[^a-zA-Z0-9]/g, '') })
                        dispatch({ name: "usernameExists", payload: false })
                    }}
                    id={"username"}
                    label={"Username"} />

            </Indicator>
            <Button onClick={usernameExists}>Check</Button>
        </div>



    )
}