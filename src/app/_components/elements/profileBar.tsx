import Image from "next/image";
import styles from "@/app/_styles/elements/profileBar.module.scss";

// TODO: Update types

export default function ProfileBar({ session, isMobile }: any) {
  if (isMobile)
    return (
      <div className={styles.container}>
        <Image
          src={session.user.profile}
          alt="profile"
          width={40}
          height={40}
        />
      </div>
    );
  else
    return (
      <div className={styles.container}>
        <Image
          src={session.user.profile}
          alt="profile"
          width={40}
          height={40}
        />

        <div>
          <h3 className={styles.username}>{session.user.username}</h3>

          <p>{session.user.email}</p>
        </div>
      </div>
    );
}
