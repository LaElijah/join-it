import authOptions from "@/app/api/auth/[...nextauth]/options";
import RequestInputs from "../../../_components/requestInputs";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import styles from "@/app/_styles/pages/create.module.scss";
import ContentWrapper from "@/app/_components/contentWrapper";

export default async function CreateRequests() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/api/auth/signin?callbackUrl=/requests");
  }

  return (
    <ContentWrapper className={styles.container}>
      <RequestInputs session={session} />
    </ContentWrapper>
  );
}
