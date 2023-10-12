"use client";

import { useMediaQuery } from "@mantine/hooks";

import styles from "@/app/_styles/elements/logo.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  const imageSettings = useMediaQuery("(max-width: 768px)")
    ? { width: 64, url: "logo.svg" }
    : { width: 128, url: `logo_with_text.svg` };

  return (
    <Link href="/" className={styles.container}>
      <Image
        alt="logo"
        src={`/iconography/${imageSettings.url}`}
        width={imageSettings.width}
        height={64}
      />
    </Link>
  );
}
