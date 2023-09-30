

import styles from '@/app/_styles/components/settingsContent.module.scss'

import Image  from "next/image"
import SignOut from "@/app/_components/elements/signOut"

export default function SettingsContent({session, children}: any) {



    return (
        <div className={styles.content}>
           
                    <h2>Profile</h2>
                    <p>Username:{session.user.username}</p>
                    <Image
                        height={128}
                        width={128}
                        src={session.user.profile}
                        alt="profile image"
                    />
                    <SignOut />

                    {children && children}
                
        </div>
    )
}