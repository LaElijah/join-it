




import SettingsBar from "./settingsBar"
import SettingsContent from "./settingsContent"
import styles from '@/app/_styles/components/settingsPage.module.scss'



export default function SettingsPage({session}: any) {


    return (
        <div className={styles.container}>
            <SettingsBar />
            <SettingsContent session={session} />
        </div>

    )
}