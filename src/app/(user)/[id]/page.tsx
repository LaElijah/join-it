import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import authOptions from "../../api/auth/[...nextauth]/options"
import Image from "next/image"
import SignOut from "@/app/_components/elements/signOut"
import styles from "@/app/_styles/pages/profile.module.scss"
import SettingsPage from "@/app/_components/settingsPage"

export default async function Profile() {
    const session = await getServerSession(authOptions)
    console.log(session)

    if (!session) {
        return redirect("/api/auth/signin?callbackUrl=/profile")
    }



    else {
        return (
            <section className={styles.container}>

               
            <SettingsPage session={session} />

              

            </section>
        )

    }

}