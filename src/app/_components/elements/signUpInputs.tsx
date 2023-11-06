"use client"
import { Button, Autocomplete, PasswordInput } from "@mantine/core";
import styles from "@/app/_styles/elements/signupInputs.module.scss";
import UsernameInput from "./usernameInput";
import { useMemo } from "react";

export default function SignUpInputs({ state, dispatch }: { state: any, dispatch: any }) {

  const rules = useMemo(() => new Map(), [])

  const { email, password, password_confirmation } = state;

  const emailCategories =
    email.trim().length > 0 && !email.includes("@")
      ? ["gmail.com", "outlook.com", "yahoo.com"].map(
        (provider) => `${email}@${provider}`,
      )
      : [];

  
  

  return (
    <div className={styles.container}>
      <Autocomplete
        value={email}
        placeholder={"your-email@provider.com"}
        onChange={(event) => {
          dispatch({ name: "email", payload: event });
          let validEvent = {
            target: {
              id: "email",
              value: event,
            },
          };
         
        }}
        type="email"
        id={"email"}
        data={emailCategories}
        label={"Email"}
      />

      <UsernameInput state={state} dispatch={dispatch} isInvalid={undefined} />
      <PasswordInput
        value={password}
        description={
          "Password must contain atleast one uppercase letter, one lowercase letter, and one special character"
        }
        placeholder={"Enter your password..."}
        onChange={(event) => {
          dispatch({ name: "password", payload: event.target.value });
          if (event.target.value !== state.password_confirmation) {
            dispatch({ name: "passwordMatchError", payload: true });
          } else {
            dispatch({ name: "passwordMatchError", payload: false });
          }
        }}
        id={"password"}
        label={"Password"}
      />
      <PasswordInput
        value={password_confirmation}
        placeholder={"Confirm your password"}
        onChange={(event) => {
          dispatch({
            name: "password_confirmation",
            payload: event.target.value,
          });
          if (event.target.value !== state.password) {
            dispatch({ name: "passwordMatchError", payload: true });
          } else {
            dispatch({ name: "passwordMatchError", payload: false });
          }
        }}
        id={"password_confirmation"}
        label={"Confirm Password"}
        error={state.passwordMatchError ? "Passwords do not match" : null}
      />
      <Button
        // disabled={state.disableForm || state.usernameExists}
        className={styles.button}
        onClick={() => {
          dispatch({ name: "submit", payload: "Skip" });
          dispatch({ name: "page", payload: 1 });
        }}
      >
        Next
      </Button>
    </div>
  );
}
