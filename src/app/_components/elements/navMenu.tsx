'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '@/app/_styles/elements/navMenu.module.scss';
import { Menu } from '@mantine/core';
import { signOut } from 'next-auth/react';
import { useMediaQuery } from '@mantine/hooks';
import ProfileBar from '@/app/_components/elements/profileBar';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IconChevronRight } from '@tabler/icons-react';

type ProfileLink = {
	name: string;
	key: number;
	icon: any;
	link: any;
};

export default function NavMenu(props: { session: any }) {
	const { session } = props;
	const [opened, setOpened] = useState(false);

	const router = useRouter();

	const profileLinks: ProfileLink[] = [
		{
			name: 'View messages',
			key: 1,
			icon: (
				<IconChevronRight
					width={16}
					height={16}
				/>
			),
			link: '/profile',
		},
		{
			name: 'Check activity',
			key: 2,
			icon: (
				<IconChevronRight
					width={16}
					height={16}
				/>
			),
			link: '/profile',
		},
		{
			name: 'Settings',
			key: 3,
			icon: (
				<IconChevronRight
					width={16}
					height={16}
				/>
			),
			link: '/profile',
		},
	];

	const isMobile = useMediaQuery('(max-width: 424px)');

	// if logged in show profile
	if (session) {
		return (
			<div className={styles.container}>
				<Menu
					opened={opened}
					onChange={setOpened}
					shadow='md'
					position='bottom'
					width={160}
				>
					<Menu.Target>
						<div onClick={() => setOpened(!opened)}>
							<ProfileBar
								isMobile={isMobile}
								session={session}
							/>
						</div>
					</Menu.Target>

					<Menu.Dropdown>
						<Menu.Label>{session.user.username}</Menu.Label>

						<Menu.Divider />

						{profileLinks.map(({ key, link, name, icon }: ProfileLink) => (
							<div
								className={styles.option}
								key={key}
							>
								<Menu.Item onClick={() => router.push(link)}>
									{icon}
									{name}
								</Menu.Item>
							</div>
						))}

						<Menu.Divider />

						<Menu.Item
							color='red'
							onClick={() => signOut()}
						>
							Logout
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			</div>
		);
	} else {
		return (
			<div className={styles.altContainer}>
				<Link href='/signin'>Login</Link>
				<Link href='/signup'>Sign up</Link>
			</div>
		);
	}
}
