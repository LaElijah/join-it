
import { TextInput, Button, Autocomplete } from "@mantine/core"
import styles from "./credentialsInput.module.scss"



export default function CredentialsInput(props) {

    const { state, dispatch } = props

     function debounce(cb, delay = 1000) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                cb.apply(null, args);
            }, delay);
        };
    }


    const usernameExists = async () => {
        const response = await fetch(`http://localhost:3000/api/auth/confirmUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: state.username })
        })
        const data = await response.json()
        return data.exists
    }


    const handleChange = async(event) => {
        // if (event.target.id === 'username') {
        //     dispatch({ name: event.target.id, value: event.target.value.replace(/[^a-zA-Z0-9]/g, '') })
        //     debounce(async () => {
        //         const exists = await usernameExists()
        //         dispatch({ name: "usernameExists", value: exists })
        //     }
        //     )()

        // }

        dispatch({ name: event.target.id, value: event.target.value })
      
    }

    const { email, username, password, confirmPassword } = state

 

    const emailCategories = email.trim().length > 0 && !email.includes('@')
      ? ['gmail.com', 'outlook.com', 'yahoo.com'].map((provider) => `${email}@${provider}`)
      : [];


    return (
        <div className={styles.container}>
            <Autocomplete value={email} placeholder={"your-email@provider.com"} onChange={(event) => { dispatch({ name: "email", value: event})}} id={"email"} data={emailCategories} label={"Email"} />
            <TextInput value={username} placeholder={"Enter your username..."} onChange={handleChange} id={"username"} label={"Username"} />
            <TextInput value={password} placeholder={"Enter your password..."} onChange={handleChange} id={"password"} label={"Password"} />
            <TextInput value={confirmPassword} placeholder={"Confirm your password"} onChange={handleChange} id={"confirmPassword"} label={"Confirm Password"} />
            <Button className={styles.button} onClick={() => {
                dispatch({ name: "page", value: 1 })
            }} >Next</Button>

        </div>


    )
}