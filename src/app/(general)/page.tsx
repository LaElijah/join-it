import styles from "@/app/_styles/pages/index.module.scss";
import Onboarding from "../_components/onboarding";
import Link from "next/link";
import { IconChevronRight, IconArrowRight } from "@tabler/icons-react";
import ContentWrapper from "../_components/contentWrapper";

export default function Index() {
  return (
    <ContentWrapper>
      <section className={styles.container}>
        <div className={styles.hero}>
          <div className={styles.updates}>
            <Link href="/changelog">What&apos;s new</Link>

            {/*TODO: Update this upon release updates*/}
            <Link href="/changelog">
              Current version v0.0.1
              <IconChevronRight />
            </Link>
          </div>

          <h1>Join It. An organizing platform</h1>
          <h3>
            Welcome to Join It (Name Pending)! This website is still in it&apos;s early
            development phase, features may be buggy and prone to change. Theres
            definitely more to come! Please try your best to form community and be
            respectful!
          </h3>

          <div className={styles.actions}>
            <Link href="/signup">Get started</Link>

            <Link href="/guest">
              Try as a guest
              <IconArrowRight />
            </Link>
          </div>
        </div>

        {/* <div>
            Put an image here 
            maybe a collaborative stock image 
        </div> */}
      </section>
    </ContentWrapper>

  );
}
