
import styles from "@/app/styles/pages/signUp.module.scss"
import Link from "next/link"
import SignUpInputs from "./elements/signUpInputs"


// TODO: Change pages length for register page

export default function SignUp(props: any) {

    const { state, dispatch } = props

    
    return (
        <div className={styles.container}>
            <section className={styles.wrapper}>

                <h2>Register</h2>
                <p>Make an account and visit the site!</p>


                <SignUpInputs state={state} dispatch={dispatch} />



                <div className={styles.options}>



                    <div>
                        <p>Already have an account?</p>

                        <Link href="/signin">
                            Sign in
                        </Link>

                    </div>



                    <div>
                        <p>Forgot your password?</p>
                        <Link href="/signin/forgot">
                            Reset password
                        </Link>
                    </div>

                </div>
            </section>



        </div>


    )
}