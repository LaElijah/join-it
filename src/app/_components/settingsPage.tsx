

import SettingsBar from "./settingsBar"
import styles from '@/app/_styles/components/settingsPage.module.scss'
import SettingsAccountDetails from "./SettingsAccountDetails"
import SettingsPrivacy from "./SettingsPrivacy"




export default function SettingsPage({ session }: any) {

    const pages = new Map([
        [
            "Account Details", 
            <SettingsAccountDetails 
            session={session} 
            />
        ],
        [
            "Privacy", 
            <SettingsPrivacy 
            session={session} 
            />
        ],
    ])





    return (
        <div className={styles.container}>
            <SettingsBar>
                    {pages}
            </SettingsBar>
        </div>
    )
}