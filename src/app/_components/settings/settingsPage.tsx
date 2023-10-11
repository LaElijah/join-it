

import ScrollBar from "./settingsBar"
import styles from '@/app/_styles/components/settings/settingsPage.module.scss'
import AccountDetails from "./settingsAccountDetails"
import Privacy from "./settingsPrivacy"

import AccountSecurity from "./settingsAccountSecurity"
import Notifications from "./settingsAccountNotifications"
import Customization from "./settingsCustomization"
import CommunicationPreferences from "./settingsCommunicationPreferences"
import AccountDeactivation from "./settingsAccountDeactivation"
import Help from "./settingsHelp"


export default function SettingsPage({ session }: any) {

    const pages = new Map([
        [
            "Account Details", 
            <AccountDetails 
            session={session} 
            />
        ],
        [
            "Account Security",
            <AccountSecurity
            session={session}
            />
        ],
        [
            "Privacy", 
            <Privacy 
            session={session} 
            />
        ],
        [
            "Notifications",
            <Notifications 
            session={session}
            />
        ],
        [
            "Communication Preferences",
            <CommunicationPreferences
            session={session} 
            />
        ],

        [
            "Customization",
            <Customization
            session={session}
            />
        ],

        [
            "Deactivate Account",
            <AccountDeactivation 
            session={session}
            />
        ],

        [
            "Help & Feedback",
            <Help 
            session={session}
            />
        ],
    ])





    return (
        <div className={styles.container}>
            <ScrollBar session={session}>
                    {pages}
            </ScrollBar>
        </div>
    )
}