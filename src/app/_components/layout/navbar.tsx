import styles from '@/app/_styles/layout/navbar.module.scss';
import Image from "next/image"
import NavBurger from '../elements/navBurger';
import NavLinks from '../elements/navLinks';
import NavMenu from '../elements/navMenu';
import Link from 'next/link';

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
				<Link
					href='/'
					className={styles.logo}
				>
					<Image alt="logo" src={"/iconography/logo.svg"} width={32} height={32} />
				</Link>

				<NavLinks linksData={linksData} />

				<div className={styles.actions}>
					<NavMenu session={session} />

					<NavBurger links={linksData} />
				</div>
			</div>
		</section>
	);
}
