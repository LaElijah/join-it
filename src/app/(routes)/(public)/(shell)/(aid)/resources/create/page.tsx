import CreateBoxes from "@/app/_components/createBoxes";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function CreateResources() {
  const session = await getServerSession();
  if (!session) {
    return redirect("/api/auth/signin?callbackUrl=/resources");
  }

  return (
    <div>
      <h2>Share a Resource</h2>
      <CreateBoxes />
    </div>
  );
}
