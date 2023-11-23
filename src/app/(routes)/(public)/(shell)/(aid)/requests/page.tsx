import { getServerSession } from "next-auth";
import authOptions from "@/app/(routes)/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import styles from "@/app/_styles/components/list.module.scss";
import RequestsActions from "@/app/_components/requestsActions";
import Link from "next/link";
import ContentWrapper from "@/app/_components/contentWrapper";
import RequestModalButton from "@/app/_components/requestModalButton";

export default async function Requests() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <ContentWrapper className={styles.container}>
      <div className={styles.header}>
        <h1>Current Requests</h1>
        <RequestModalButton >Request aid </RequestModalButton>
      </div>

      <RequestsActions />

    </ContentWrapper>
  );
}
