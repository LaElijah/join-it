import { Button, Autocomplete, PasswordInput } from "@mantine/core"
import styles from "@/app/styles/elements/signupInputs.module.scss"
import UsernameInput from "./usernameInput";
import Validator from "validatorjs";
import { useEffect } from "react";

export default function SignUpInputs(props: any) {

    const { state, dispatch } = props


    const rules = {
        password: 'required|min:8|max:20|confirmed',
        password_confirmation: 'required|min:8|max:20',
        email: 'required|email',
        username: 'required|min:3|max:20'
       
    }

    const validation = new Validator(state, rules)

    const { email, password, password_confirmation } = state

    const emailCategories = email.trim().length > 0 && !email.includes('@')
        ? ['gmail.com', 'outlook.com', 'yahoo.com'].map((provider) => `${email}@${provider}`)
        : [];

    const handleChange = async (event: any) => {
         dispatch({ name: event.target.id, value: event.target.value })
            if (event.target.id === "password" && event.target.value !== state.password_confirmation) {
                dispatch({ name: "passwordMatchError", value: true })
            }
            else if (event.target.id === "password" && event.target.value === state.password_confirmation) {
                dispatch({ name: "passwordMatchError", value: false })
            }
            if (event.target.id === "password_confirmation" && event.target.value !== state.password) {
                dispatch({ name: "passwordMatchError", value: true })
            }
            else if (event.target.id === "password_confirmation" && event.target.value === state.password) {
                dispatch({ name: "passwordMatchError", value: false })
            }
             
        }


    useEffect(() => {
        console.log(state.passwordMatchError)
        dispatch({ name: "disableForm", value: validation.fails() })
    }, [state.password, state.password_confirmation, state.email, state.username])


    const isDisabled = () => {
        return !!(state.disableForm || state.usernameExists);
    }


    return (
        <div className={styles.container}>
            <Autocomplete value={email} placeholder={"your-email@provider.com"} onChange={(event) => { dispatch({ name: "email", value: event }) }} id={"email"} data={emailCategories} label={"Email"} />

            <UsernameInput
                state={state}
                dispatch={dispatch}
                validation={validation}
            />
            <PasswordInput value={password} description={"Password must contain atleast one uppercase letter, one lowercase letter, and one special character"} placeholder={"Enter your password..."} onChange={handleChange} id={"password"} label={"Password"} />
            <PasswordInput 
            value={password_confirmation} 
            placeholder={"Confirm your password"} 
            onChange={handleChange} 
            id={"password_confirmation"} 
            label={"Confirm Password"} 
            error={state.passwordMatchError ? "Passwords do not match" : null}
            />
            <Button 
            disabled={isDisabled()}
            className={styles.button} 
            onClick={() => {
                
                dispatch({ name: "submit", value: "Skip" })
                dispatch({ name: "page", value: 1 })
            }} >Next</Button>

        </div>


    )
}