import { getServerSession } from "next-auth";
import authOptions from "@/app/(routes)/api/auth/[...nextauth]/options";
import styles from "@/app/_styles/pages/profile.module.scss";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/signin");
  }

  return <section className={styles.container}>Profile</section>;
}
