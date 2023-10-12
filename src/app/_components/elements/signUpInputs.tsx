import { Button, Autocomplete, PasswordInput } from "@mantine/core";
import styles from "@/app/_styles/elements/signupInputs.module.scss";
import UsernameInput from "./usernameInput";

const rules: any = {};
export default function SignUpInputs(props: any) {
  const { state, dispatch } = props;

  const { email, password, password_confirmation } = state;

  const emailCategories =
    email.trim().length > 0 && !email.includes("@")
      ? ["gmail.com", "outlook.com", "yahoo.com"].map(
          (provider) => `${email}@${provider}`,
        )
      : [];

  const isInvalid = async (
    event: {
      target: { id: string; value: string };
    },
    cb = console.log,
  ) => {
    const { id, value } = event.target;

    switch (id) {
      case "password":
        rules[id] =
          state.password === state.password_confirmation &&
          state.password.length >= 8;

        rules["password_confirmation"] =
          state.password === state.password_confirmation &&
          state.password_confirmation.length >= 8;
        break;
      case "password_confirmation":
        rules[id] =
          state.password === state.password_confirmation &&
          state.password.length >= 8;
        rules["password"] =
          state.password === state.password_confirmation &&
          state.password_confirmation.length >= 8;
        break;
      case "email":
        rules[id] = state.email.includes("@") && state.email.includes(".");
        break;
      case "username":
        rules[id] = cb(event);
        break;
      default:
        rules.set(id, value !== "");
        break;
    }

    // ruleList.forEach((rule) => handleRule(rule, state[rule], state))

    console.log(rules);
    const passes = Object.values(rules).includes(false);
    console.log(passes);
    return passes;
  };

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
          dispatch({ name: "disableForm", payload: isInvalid(validEvent) });
        }}
        type="email"
        id={"email"}
        data={emailCategories}
        label={"Email"}
      />

      <UsernameInput state={state} dispatch={dispatch} isInvalid={isInvalid} />
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

          dispatch({ name: "disableForm", payload: isInvalid(event) });
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

          dispatch({ name: "disableForm", payload: isInvalid(event) });
        }}
        id={"password_confirmation"}
        label={"Confirm Password"}
        error={state.passwordMatchError ? "Passwords do not match" : null}
      />
      <Button
        disabled={state.disableForm || state.usernameExists}
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
