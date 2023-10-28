import styles from "@/app/_styles/pages/guest.module.scss";
import GuestData from "@/app/_components/elements/guestData";
import GuestRequest from "@/app/_components/elements/guestRequest";
import GuestSignUpController from "@/app/_components/elements/guestSignUpController";

export default function Guest() {
  let pages = new Map();

  pages.set(0, <GuestRequest />);
  pages.set(1, <GuestData />);

  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <GuestSignUpController>{pages}</GuestSignUpController>
      </div>
    </section>
  );
}
