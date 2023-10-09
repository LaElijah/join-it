"use client"

import styles from '@/app/_styles/components/settings/settingsBar.module.scss'
import { useState } from "react";

type OptionGroup = {
    label: string,
    options: string[],
}


interface OptionGroupProps extends OptionGroup {
    setPage: (option: string) => void,
    page: string;
}

export function OptionGroup({ label, options, setPage, page }: OptionGroupProps) {
    return (
        <div key={label} >
            <h3>{label}</h3>

            <div
                key={label}
                className={styles.group}
            >
                {options.map((option) => {
                    return (

                        <div
                            key={option}
                            onClick={() => setPage(option)}
                            className={(option === page) ? styles.activeOption : styles.option}
                        >
                            <h2 >
                                {option}
                            </h2>
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
                <div>
                    Profile Header
                </div>
                {settingsOptions.map(({ label, options }: OptionGroup) => {
                    return (
                        <OptionGroup
                            label={label}
                            options={options}
                            setPage={setPage}
                            page={page}
                        />
                    )
                })}
            </div>


            <section className={styles.content}>
                {children.get(page)}
            </section>
        </>
    )
}