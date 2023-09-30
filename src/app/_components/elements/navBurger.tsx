"use client"



import { useMediaQuery } from "@mantine/hooks";
import { Burger, Menu } from '@mantine/core';
import { useRouter } from "next/navigation"


type Link = {
    name: string,
    key: number
}

interface Props {
    links: Link[]
}


export default function NavBurger(props: Props): React.ReactElement | undefined {

    const router = useRouter()
    const { links } = props

    if (useMediaQuery('(max-width: 768px)')) {
        return (
            <Menu shadow="md" width={200}>
            <Menu.Target>
                <Burger aria-label="Toggle menu" />
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item
                    onClick={() => router.push(`/`)}
                >
                    Home
                </Menu.Item>
                {links.map((link) => (
                    <Menu.Item
                        key={link.key}
                        onClick={() => router.push(`/${link.name.toLowerCase()}`)}
                    >
                        {link.name}
                    </Menu.Item>
                ))}
            </Menu.Dropdown>
        </Menu>
        )
    }
}