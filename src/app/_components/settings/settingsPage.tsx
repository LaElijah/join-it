

import SettingsBar from "./settingsBar"
import styles from '@/app/_styles/components/settings/settingsPage.module.scss'
import SettingsAccountDetails from "./settingsAccountDetails"
import SettingsPrivacy from "./settingsPrivacy"




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
            <SettingsBar session={session}>
                    {pages}
            </SettingsBar>
        </div>
    )
}