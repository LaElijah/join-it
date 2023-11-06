import styles from "@/app/_styles/pages/signup.module.scss";
import Link from "next/link";
import SignUpInputs from "./elements/signUpInputs";
import { useEffect } from "react";

// TODO: Change pages length for register page

export default function SignUp({ state, dispatch }: { state: any, dispatch: any }) {
  

  

  return (
    <div className={styles.container}>
      <section className={styles.wrapper}>
        <h2>Register</h2>
        <p>Make an account and visit the site!</p>

        <SignUpInputs state={state} dispatch={dispatch} />

        <div className={styles.options}>
          <div>
            <p>Already have an account?</p>

            <Link href="/signin">Sign in</Link>
          </div>

          <div>
            <p>Forgot your password?</p>
            <Link href="/signin/forgot">Reset password</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
