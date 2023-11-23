"use client"

import { useState } from "react"
import styles from "@/app/_styles/elements/tabGroup.module.scss"

type Key = string | number;

type Tab = {
    key: Key,
    label: string
}

interface TabGroupProps {
    tabs: Tab[]
    children: Map<Key, JSX.Element>
    overrideStyles?: string,
    defaultKey?: string
}

export default function TabGroup({
    tabs,
    children,
    overrideStyles,
    defaultKey = "Community"
}: TabGroupProps) {
    const [tab, setTab] = useState<Key>(defaultKey)

    return (

        <>
        <section className={styles.tabs}>
            {tabs.map(({key, label}: Tab) => <div className={(key === tab ? styles.tabPressed : styles.tab)} key={key} onClick={() => setTab(key)}>{label}</div>)}
        </section>
    
        <div className={overrideStyles ? overrideStyles : styles.container}>{children.get(tab)}</div>
        </>

        
    )
}