"use client"

import { useMediaQuery } from "@mantine/hooks";
import styles from '@/app/_styles/elements/navLinks.module.scss'
import Link from 'next/link'
import { usePathname } from "next/navigation";


type Link = {
    name: string,
    key: number
}

interface Props {
    links: Link[]
    session: any
}

export default function NavLinks(props: any): React.ReactElement | undefined {
    const { links } = props
    const pathname = usePathname()

    console.log(pathname)


    if (useMediaQuery('(min-width: 769px)')) {
        return (
            <div className={styles.container}>
                <Link href="/" className={pathname === "/" ? styles.activeLink : styles.link}>
                    Home
                </Link>
                {
                    links.map((link: Link) => (
                        <Link
                            href={`/${link.name.toLowerCase()}`}
                            key={link.key}
                            className={pathname === `/${link.name.toLowerCase()}` ? styles.activeLink : styles.link}
                        >
                            {link.name}
                        </Link>
                    ))
                }
            </div>
        )
    }
}