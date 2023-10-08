"use client"

import styles from '@/app/_styles/components/settingsBar.module.scss'
import { useState } from "react";
import SettingsPage from './settingsPage';


type OptionGroup = {
    label: string,
    options: string[],
}


interface OptionGroupProps extends OptionGroup {
    setPage: (option: string) => void
}

export function OptionGroup({ label, options, setPage }: OptionGroupProps) {
    return (
        <div
            key={label}
        >
            <h2>{label}</h2>

            <div>
                {options.map((option) => {
                    return (
                        
                        <div onClick={() => setPage(option)}>
                            <h3 key={option}>
                                {option}
                            </h3>
                        </div>

                    )
                }
                )}
            </div>

        </div>
    )
}

export default function SettingsBar({ children }: any) {



    const [page, setPage] = useState("Account Details")

    const settingsOptions: OptionGroup[] = [
        {
            label: "Personal Settings",
            options: [
                "Account Details",
            ]

        },
        {
            label: "Security",
            options: [
                "Privacy",
            ]

        }
    ]

    return (
        <>
            <div className={styles.container}>
                {settingsOptions.map(({ label, options }: OptionGroup) => {
                    return (<OptionGroup
                        label={label}
                        options={options}
                        setPage={setPage}
                    />)
                })}
            </div>


            <section className={styles.content}>
                {children.get(page)}
            </section>
        </>
    )
}