"use client";
import { TextInput, Indicator, Button } from "@mantine/core";
import styles from "@/app/_styles/elements/usernameInput.module.scss";
import { useMemo } from "react";
import { debounce } from "@/app/_utils/tools/debounce";

export default function UsernameInput({ state, dispatch, isInvalid }: 
  { state: any, dispatch: any, isInvalid: any }) {
  const { username } = state;

  async function usernameExists(event: any) {
      const response = await fetch(`api/auth/confirmUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: event.target.value }),
      });
      const data = await response.json();
      return data.exists;
    
  }

  const debouncedUsernameExists = useMemo(
    () =>
      debounce(async (event: any) => {
        isInvalid(event, async () => {
          let response = await usernameExists(event);
          dispatch({ name: "usernameExists", payload: response });
          return response;
        });
      }, 300),
    [],
  );

  return (
    <div className={styles.container}>
      <Indicator
        position={"bottom-end"}
        color={state.usernameExists ? "red" : "green"}
      >
        <TextInput
          description={state.usernameExists ? "Username already exists!" : ""}
          error={state.usernameExists}
          value={username}
          placeholder={"Enter your username..."}
          id={"username"}
          label={"Username"}
          onChange={(event) => {
            dispatch({
              name: "username",
              payload: event.target.value.replace(/[^a-zA-Z0-9]/g, ""),
            });

            dispatch({ name: "usernameExists", payload: false });

            debouncedUsernameExists(event);
          }}
        />
      </Indicator>
      <Button onClick={usernameExists}>Check</Button>
    </div>
  );
}
