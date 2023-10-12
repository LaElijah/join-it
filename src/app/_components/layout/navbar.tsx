import styles from "@/app/_styles/layout/navbar.module.scss";
import Image from "next/image";
import NavBurger from "../elements/navBurger";
import NavLinks from "../elements/navLinks";
import NavMenu from "../elements/navMenu";
import Link from "next/link";
import Logo from "../elements/logo";

type Link = {
  name: string;
  key: number;
};

type LinkGroup = {
  group: string;
  links: Link[];
};

type LinkData = LinkGroup | Link;

interface Props {
  linksData: LinkData[];
  session: any;
}

export default function Navbar(props: Props): React.ReactElement | undefined {
  const { session, linksData } = props;

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <Logo />

        <NavLinks linksData={linksData} />

        <div className={styles.actions}>
          <NavMenu session={session} />

          <NavBurger links={linksData} />
        </div>
      </div>
    </section>
  );
}
