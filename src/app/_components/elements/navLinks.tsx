"use client";

import { useMediaQuery } from "@mantine/hooks";
import styles from "@/app/_styles/elements/navLinks.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "@mantine/core";

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

export default function NavLinks(props: any): React.ReactElement | undefined {
  const { linksData } = props;
  const pathname = usePathname();

  const isMatching = (data: LinkGroup, groupName: string) => {
    const foundData = linksData
      .find((link: any) => link.group === data.group)
      .links.find((link: any) => {
        if (groupName === link.name.toLowerCase()) {
          return true;
        } else {
          return false;
        }
      });

    if (foundData) {
      return true;
    } else {
      return false;
    }
  };

  if (useMediaQuery("(min-width: 769px)")) {
    return (
      <div className={styles.container}>
        <Link
          href="/"
          className={pathname === "/" ? styles.activeLink : styles.link}
        >
          Home
        </Link>
        {linksData.map((data: any) => {
          if (!data.hasOwnProperty("group")) {
            return (
              <Link
                href={`/${data.name.toLowerCase()}`}
                key={data.key}
                className={
                  pathname === `/${data.name.toLowerCase()}`
                    ? styles.activeLink
                    : styles.link
                }
              >
                {data.name}
              </Link>
            );
          } else {
            return (
              <Menu shadow="md" position="bottom" width={200} key={data.group}>
                <Menu.Target>
                  <p
                    className={
                      isMatching(data, pathname.split("/")[1])
                        ? styles.activeLink
                        : styles.link
                    }
                  >
                    {data.group}
                  </p>
                </Menu.Target>

                <Menu.Dropdown>
                  {data.links.map((link: Link) => {
                    return (
                      <Menu.Item key={link.key}>
                        <Link href={`/${link.name.toLowerCase()}`}>
                          {link.name}
                        </Link>
                      </Menu.Item>
                    );
                  })}
                </Menu.Dropdown>
              </Menu>
            );
          }
        })}
      </div>
    );
  }
}
