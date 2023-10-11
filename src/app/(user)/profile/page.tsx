import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import styles from "@/app/_styles/pages/profile.module.scss"



export default async function Profile() {
    const session = await getServerSession(authOptions)


    return (
        <section className={styles.container}>
            Profile
        </section>
    )


}