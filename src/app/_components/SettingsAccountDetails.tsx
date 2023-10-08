


import Image from "next/image"
import styles from "@/app/_styles/components/settingsAccountDetails.module.scss"

export default function SettingsAccountDetails({ session }: any): JSX.Element {


    return (
        <>



            <div className={styles.profileHeader}>

                <div className={styles.userData}>
                    <h2>Profile</h2>
                    <h3>Username:{session.user.username}</h3>
                </div>

                

                    <Image
                        height={128}
                        width={128}
                        src={session.user.profile}
                        alt="profile image"
                    />
                


            </div>


            <div className={styles.settings}>

            </div>


        </>
    )
}