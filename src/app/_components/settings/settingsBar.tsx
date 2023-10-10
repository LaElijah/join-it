"use client"

import styles from '@/app/_styles/components/settings/settingsBar.module.scss'
import { useState } from "react";
import ProfileBar from '../elements/profileBar';
import OptionGroup from '../elements/optionGroup';

type OptionGroup = {
	label: string;
	options: string[];
};

export default function SettingsBar({ children, session }: any) {

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
            <ProfileBar isMobile={true} session={session} />

                

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