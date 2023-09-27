
import SignInInputs from "@/app/_components/elements/signInInputs"
import Link from "next/link"
import styles from "@/app/_styles/pages/signin.module.scss"
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation"

export default async function SignIn() {
    const session = await getServerSession(authOptions)

    if (session) {
        redirect("/profile")
    }




    return (

        <div className={styles.container}>

            <section className={styles.wrapper}>
                <h2>Sign in</h2>
                <p>Sign in with your credentials</p>

                <SignInInputs />

                <div className={styles.options}>

                    <div>
                        <p>New here?</p>

                        <Link href="/signup">
                            Sign up
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