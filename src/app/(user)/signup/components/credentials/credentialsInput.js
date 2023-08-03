import { TextInput, Button, Autocomplete, PasswordInput, Indicator } from "@mantine/core"
import styles from "./credentialsInput.module.scss"
import { useCallback, useEffect } from "react";
import debounce from "@/app/_utils/tools/debounce"


export default function CredentialsInput(props) {

    const { state, dispatch } = props




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
    }, 300)


    const validateUsername = useCallback(executeVerify, [state.username])

    useEffect(() => {
        usernameExists()
    }, [state.verifyUsername])



    const handleChange = async (event) => {
        dispatch({ name: event.target.id, value: event.target.value })
    }

    const { email, username, password, confirmPassword } = state



    const emailCategories = email.trim().length > 0 && !email.includes('@')
        ? ['gmail.com', 'outlook.com', 'yahoo.com'].map((provider) => `${email}@${provider}`)
        : [];


    return (
        <div className={styles.container}>
            <Autocomplete value={email} placeholder={"your-email@provider.com"} onChange={(event) => { dispatch({ name: "email", value: event }) }} id={"email"} data={emailCategories} label={"Email"} />

            <div className={styles.username} >
                <Indicator position={"bottom-end"} color={(state.usernameExists ? "red" : "green")} >
                    <TextInput description={(state.usernameExists) ? "Username already exists!" : ""} error={state.usernameExists} value={username} placeholder={"Enter your username..."}
                        onChange={(event) => {
                            dispatch({ name: "username", value: event.target.value.replace(/[^a-zA-Z0-9]/g, '') })
                            validateUsername()

                        }} id={"username"} label={"Username"} />

                </Indicator>
                <button onClick={usernameExists}>Check</button>
            </div>
            <PasswordInput value={password} description={"Password must contain atleast one uppercase letter, one lowercase letter, and one special character"} placeholder={"Enter your password..."} onChange={handleChange} id={"password"} label={"Password"} />
            <PasswordInput value={confirmPassword} placeholder={"Confirm your password"} onChange={handleChange} id={"confirmPassword"} label={"Confirm Password"} />
            <Button className={styles.button} onClick={() => {
                dispatch({ name: "submit", value: "Skip" })
                dispatch({ name: "page", value: 1 })
            }} >Next</Button>

        </div>


    )
}