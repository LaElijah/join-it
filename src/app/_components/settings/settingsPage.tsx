import ScrollBar from "./settingsBar";
import styles from "@/app/_styles/components/settings/settingsPage.module.scss";
import AccountDetails from "./settingsAccountDetails";
import Privacy from "./settingsPrivacy";

import AccountSecurity from "./settingsAccountSecurity";
import Notifications from "./settingsAccountNotifications";
import Customization from "./settingsCustomization";
import CommunicationPreferences from "./settingsCommunicationPreferences";
import AccountDeactivation from "./settingsAccountDeactivation";
import Help from "./settingsHelp";

export default function SettingsPage({ session }: any) {
  const pages = new Map([
    ["Details", <AccountDetails key={0} session={session} />],
    ["Security", <AccountSecurity key={1} session={session} />],
    ["Privacy", <Privacy key={2} session={session} />],
    ["Notifications", <Notifications key={3} session={session} />],
    ["Communication", <CommunicationPreferences key={4} session={session} />],
    ["Customization", <Customization key={5} session={session} />],
    ["Deactivate", <AccountDeactivation key={6} session={session} />],
    ["Help & Feedback", <Help key={7} session={session} />],
  ]);

  return (
    <div className={styles.container}>
      <ScrollBar session={session}>{pages}</ScrollBar>
    </div>
  );
}
