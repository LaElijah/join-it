import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import styles from "@/app/_styles/components/list.module.scss";
import RequestsActions from "@/app/_components/requestsActions";
import Link from "next/link";

export default async function Requests() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h1>Current Requests</h1>
        <Link href={"/requests/create"}>Request a resource</Link>
      </div>

      <RequestsActions />
    </section>
  );
}
