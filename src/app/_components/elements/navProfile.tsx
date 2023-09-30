"use client"

import Image from 'next/image'
import Link from 'next/link'
import styles from '@/app/_styles/elements/navProfile.module.scss'
import { Avatar, Menu } from '@mantine/core'
import { signOut } from 'next-auth/react'
import { useMediaQuery } from '@mantine/hooks'






const AvatarMenu = ({ session, isMobile }: any) => {

    if (isMobile) return (

        <Image
            src={session.user.profile}
            alt="profile"
            width={40}
            height={40}
        />
    )
    else return (
        <>
            <Image
                src={session.user.profile}
                alt="profile"
                width={40}
                height={40}
            />

            <div>
                <h3 className={styles.username}>
                    {session.user.username}
                </h3>

                <p>
                    {session.user.email}
                </p>

            </div>
        </>

    )

}


type ProfileLink = {
    name: string,
    key: number,
    icon: any
}

export default function NavProfile(props: { session: any }) {

    const { session } = props

    const profileLinks: ProfileLink[] = [
        { name: "Open dashboard", key: 1, icon: null },
        { name: "View profile", key: 2, icon: null },
        { name: "View messages", key: 3, icon: null },
        { name: "Check activity", key: 4, icon: null },
        { name: "Settings", key: 5, icon: null },

    ]



    // if logged in show profile
    if (session) {


        return (

            <div className={styles.container}>

                <Menu
                    shadow="md"
                    position="bottom"
                    width={160}
                >


                    <Menu.Target>
                        <div className={styles.account}>
                            <AvatarMenu isMobile={useMediaQuery('(max-width: 424px)')} session={session} />
                        </div>
                    </Menu.Target>

                    <Menu.Dropdown>

                        <Menu.Label>
                            {session.user.username}
                        </Menu.Label>

                        <Menu.Divider />

                        {profileLinks.map((link: ProfileLink) => (
                            <Menu.Item
                                key={link.key}
                            >
                                {link.name}
                            </Menu.Item>
                        ))}

                        <Menu.Divider />

                        <Menu.Item
                            color="red"
                            onClick={() => signOut()}
                        >
                            Logout
                        </Menu.Item>





                    </Menu.Dropdown>

                </Menu>

            </div>
        )

    }

    else {
        return (
            <div className={styles.altContainer}>
                <Link href="/signin">
                    Login
                </Link>
                <Link href="/signup">
                    Sign up
                </Link>
            </div>
        )
    }
}