import { Stack } from "@mui/material";
import Link from "next/link";
import styles from "@/app/_styles/components/hero.module.scss";
import { getServerSession } from "next-auth/next";
import authOptions from "@/app/api/auth/[...nextauth]/options";

export default async function Onboarding() {
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <div className={styles.onboarding}>
        <h2>Thanks for trying the Join-It demo</h2>
        <h4>Welcome back! Visit the site!</h4>
        <Link href="/profile">Profile</Link>
      </div>
    );
  } else {
    return (
      <div className={styles.onboarding}>
        <h2>Thanks for trying the Join-It demo</h2>
        <h4>Make an account and visit the site!</h4>
        <Stack direction="row" spacing={2}>
          <Link href="/signup">Sign up</Link>
          <Link href="/api/auth/signin">Login</Link>
        </Stack>
      </div>
    );
  }
}
