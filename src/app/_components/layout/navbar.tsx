

import styles from '@/app/_styles/layout/navbar.module.scss'

import NavBurger from '../elements/navBurger';
import NavLinks from '../elements/navLinks';
import NavProfile from '../elements/navProfile';

type Link = {
  name: string,
  key: number
}

interface Props {
  links: Link[]
  session: any
}


export default function Navbar(props: Props): React.ReactElement | undefined {
  const { session, links } = props

  return (
    <section className={styles.container}>

      <div className={styles.wrapper}>

        <div className={styles.logo}>
          <h1>Logo</h1>
        </div>

        <NavLinks links={links} />


        <div className={styles.actions}>

          <NavProfile session={session} />

          <NavBurger  links={links} />

        </div>



      </div>

    </section>
  )
}

