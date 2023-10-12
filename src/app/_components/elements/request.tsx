import styles from "@/app/_styles/elements/request.module.scss";
import Image from "next/image";
import Progress from "./progress";
import Link from "next/link";

// TODO: Add a link to the user's profile
// TODO: Add goal and a segemted progress bar

interface RequestProps {
  url: string;
  username: string;
  resource: string;
  details: string;
  progress: string;
  goal: string;
  category: string;
  image: string;
  date: string;
  id: string;
}

export default function Request(props: RequestProps) {
  const {
    url,
    username,
    resource,
    details,
    progress,
    goal,
    category,
    image,
    date,
    id,
  } = props;

  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <h2>@{username}</h2>
        <div className={styles.resource}>
          <h2>Resource:</h2>
          <h2>{resource}</h2>
        </div>
      </section>

      <section className={styles.details}>
        <Image height={64} width={64} alt="" src={image} />
        <div className={styles.description}>
          <h3 className={styles.body}>{details}</h3>
          <Link href={`/requests/${id}`} className={styles.link}>
            Show more
          </Link>
        </div>
      </section>

      <section className={styles.progress}>
        <Progress value={progress} />
        {/* <h2>${props.progress}/{props.goal}</h2> */}
      </section>

      <section className={styles.footer}>
        <h2>Posted: {date}</h2>
        <div className={styles.category}>
          <h2>Category:</h2>
          <h2>{category}</h2>
        </div>
      </section>

      {/* <section >
                <Link className={styles.link} href="">Get connected</Link>
            </section> */}
    </div>
  );
}
