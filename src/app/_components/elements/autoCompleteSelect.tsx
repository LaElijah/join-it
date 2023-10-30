"use client"

import { useState } from "react"
import {
    Combobox,
    useCombobox,
    TextInput,
    Divider
} from '@mantine/core';
import group from "@/app/_utils/models/group";







type Option = {
    key: string | number,
    value: string,
    group? : string,
    data?: any
}


interface AutoCompleteSelect {
    options: Option[],
    SelectElement?: any,
    value?: string,
    onChange?: (event: string) => void,
    label?: string,
    placeholder?: string,
    description?: string
}
// should accept options parameter for selections
// should allow a custom option component but provide a default one 
// should filter options by search value

export function Selection({
    key,
    value,
}: Option) {
    return (
        <Combobox.Option value={value} key={key}>
            {value}
        </Combobox.Option>
    )
}





export default function AutoCompleteSelect({
    options,
    SelectElement,
    value,
    onChange,
    label,
    placeholder,
    description
}: AutoCompleteSelect) {
    const [query, setQuery] = useState("")
    const Option = SelectElement ? SelectElement : Selection
    const groups = Array.from(new Set(options.map((option: any) => (option.group))))
    const nonGroupOptions = options.filter((option) => (!option.group))

    const combobox = useCombobox()

    const handleChange = (event: any) => {
        if (event.target.value !== "") combobox.openDropdown()
        else combobox.closeDropdown()

        setQuery(() => {
            if (onChange) onChange(event)
            return event.target.value
        })
    }

console.log( groups[0] !== undefined)

    return (
        <Combobox
            store={combobox}
        >
            <Combobox.Target>
                <TextInput
                    label={label}
                    placeholder={placeholder}
                    value={value}
                    description={description}
                    onChange={handleChange}
                />
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options>
                    {options.length === 0 && <Combobox.Empty>Nothing Found</Combobox.Empty>}
                    {groups.map((group: string) => {
                        return options.map((option) => {
                            if (option.group === group && (option.value.includes(query))) {
                                return (
                                    <>
                                        {group && <Divider my="xs" label={group} labelPosition="left" />}
                                        {group && <Option {...option} />}
                                    </>
                                )
                            }
                        })
                    }
                    )}

                    {nonGroupOptions.map((option: Option, index: number) => {
                        return (
                            <>
                                {(nonGroupOptions.length > 0 && index === 0 && groups.length > 0 && groups[0] !== undefined && <Divider my="xs" label="other" labelPosition="left" />)}
                                {(!option.group && option.value.includes(query)) && <Option {...option} />}
                            </>
                        )
                    })}

                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    )
}