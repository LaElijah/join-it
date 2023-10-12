"use client";

import { useMediaQuery } from "@mantine/hooks";
import { Burger, Menu } from "@mantine/core";
import { useRouter } from "next/navigation";

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
  links: LinkData[];
}

export default function NavBurger(
  props: Props,
): React.ReactElement | undefined {
  const router = useRouter();
  const { links } = props;

  if (useMediaQuery("(max-width: 768px)")) {
    return (
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Burger aria-label="Toggle menu" />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item onClick={() => router.push(`/`)}>Home</Menu.Item>
          {links.map((link: any) => {
            if (!link.hasOwnProperty("group")) {
              return (
                <Menu.Item
                  key={link.key}
                  onClick={() => router.push(`/${link.name.toLowerCase()}`)}
                >
                  {link.name}
                </Menu.Item>
              );
            } else {
              return link.links.map((link: any) => {
                return (
                  <Menu.Item
                    key={link.key}
                    onClick={() => router.push(`/${link.name.toLowerCase()}`)}
                  >
                    {link.name}
                  </Menu.Item>
                );
              });
            }
          })}
        </Menu.Dropdown>
      </Menu>
    );
  }
}
