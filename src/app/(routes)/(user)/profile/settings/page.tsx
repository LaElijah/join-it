import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import authOptions from "../../../api/auth/[...nextauth]/options";
import styles from "@/app/_styles/pages/profile.module.scss";
import SettingsPage from "@/app/_components/settings/settingsPage";
import ContentWrapper from "@/app/_components/contentWrapper";


export default async function Settings() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/api/auth/signin?callbackUrl=/profile");
  } else {
    return (
      <ContentWrapper className={styles.container}>

        <SettingsPage session={session} />
      </ContentWrapper>
    );
  }
}
