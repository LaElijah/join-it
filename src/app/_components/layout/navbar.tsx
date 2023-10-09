

import styles from '@/app/_styles/layout/navbar.module.scss'

import NavBurger from '../elements/navBurger';
import NavLinks from '../elements/navLinks';
import NavProfile from '../elements/navProfile';
import Link from 'next/link';

type Link = {
  name: string,
  key: number,
}

type LinkGroup = {
  group: string,
  links: Link[]
}

type LinkData = LinkGroup | Link

interface Props {
  linksData: LinkData[]
  session: any
}


export default function Navbar(props: Props): React.ReactElement | undefined {
  const { session, linksData } = props

  return (
    <section className={styles.container}>

      <div className={styles.wrapper}>

        <Link
          href="/"
          className={styles.logo}

        >
          <h1>Logo</h1>
        </Link>

        <NavLinks linksData={linksData} />


        <div className={styles.actions}>

          <NavProfile session={session} />

          <NavBurger links={linksData} />

        </div>



      </div>

    </section>
  )
}
