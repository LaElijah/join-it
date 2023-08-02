
import styles from "./credentials.module.scss"
import Link from "next/link"
import CredentialsInput from "./credentialsInput"




export default function Credentials(props) {

    const { state, dispatch } = props

    
    return (
        <div className={styles.container}>
            <section className={styles.wrapper}>

                <h2>Register</h2>
                <p>Make an account and visit the site!</p>


                <CredentialsInput state={state} dispatch={dispatch} />



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