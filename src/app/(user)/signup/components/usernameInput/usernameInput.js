"use client"
import { TextInput, Indicator, Button } from "@mantine/core"
import styles from "./usernameInput.module.scss"
import { useCallback, useEffect } from "react";
import debounce from "@/app/_utils/tools/debounce"




export default function UsernameInput(props) {


    const { state, dispatch } = props

    const { username } = state

    async function usernameExists() {
        const response = await fetch(`http://localhost:3000/api/auth/confirmUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: state.username.toLowerCase() })
        })
        const data = await response.json()
        dispatch({ name: "usernameExists", value: data.exists })
    };


    const toggle = () => (state.verifyUsername !== true)

    const executeVerify = debounce(() => {
        dispatch({ name: "verifyUsername", value: toggle() })
    }, 500)


    const validateUsername = useCallback(executeVerify, [state.username])

    useEffect(() => {
        usernameExists()
    }, [state.verifyUsername])




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
                        dispatch({ name: "usernameExists", value: false })
                        dispatch({ name: "username", value: event.target.value.replace(/[^a-zA-Z0-9]/g, '') })
                        validateUsername()
                    }}
                    id={"username"}
                    label={"Username"} />

            </Indicator>
            <Button onClick={usernameExists}>Check</Button>
        </div>



    )
}