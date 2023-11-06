"use client";

import styles from "@/app/_styles/components/settings/settingsBar.module.scss";
import { useState } from "react";
import ProfileBar from "./elements/profileBar";
import OptionGroup from "./elements/optionGroup";

type OptionGroup = {
  label: string;
  options: string[];
};

interface SettingsBarProps {
  children?: Map<string, JSX.Element>,
  session: any,
  options: OptionGroup[],
  element?: (data: any) => JSX.Element,
  data?: any,
  onClick?: (event: any) => void
}

export default function SettingsBar({ 
  children, 
  session, 
  options, 
  element: SingleTypeElement, 
  data,
  onClick
  }: SettingsBarProps) {
  const [page, setPage] =  useState("Account Details");
  const body = SingleTypeElement ? <SingleTypeElement data={data} session={session} /> : children?.get(page)

  
  

  return (
    <>
      <div className={styles.container}>
        <ProfileBar isMobile={true} session={session} />

        {options.map(({ label, options }: OptionGroup) => {
          return (
            <OptionGroup
              key={label}
              label={label}
              options={options}
              setPage={setPage}
              page={page}
              onClick={onClick}
            />
          );
        })}
      </div>

      <section className={styles.content}>{body}</section>
    </>
  );
}
