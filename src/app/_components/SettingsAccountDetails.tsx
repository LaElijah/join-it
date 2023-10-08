


import Image from "next/image"
import styles from "@/app/_styles/components/settingsAccountDetails.module.scss"

export default function SettingsAccountDetails({ session }: any): JSX.Element {


    return (
        <>



            <div className={styles.profileHeader}>

                <div className={styles.userData}>
                    <div>
                    <h1>Profile</h1>
                    <h2>Username:{session.user.username}</h2>
                    </div>

                    <div>

                        <div>
                        <h3>Main Community</h3>
                        <h2>Rondo Coalition</h2>
                        </div>


                    </div>
                </div>

                

                    <Image
                        height={128}
                        width={128}
                        src={session.user.profile}
                        alt="profile image"
                    />
                


            </div>


            <div className={styles.settings}>

                <section className={styles.settingsBarFirst}>
                
                <div className={styles.primarySettings}>
                    Some setting
                </div>

                <div className={styles.secondarySettings}>
                    Some alternate setting
                </div>
                </section>

                <div className={styles.settingsBarSecond}>
                    <h2>This is a long settings card bar</h2>
                </div>

            </div>


        </>
    )
}