"use client"

import { useState } from "react"

type DefaultComponentProps = {
    setting: "default"
    allConnections: any[],
    createGroup: any,
    hostname: string
}

export default function MessageSelector({ data }: { data: DefaultComponentProps }) {

    const {
        createGroup,
        allConnections
    } = data

    const [multiSelect, setMultiSelect] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState<string[]>([])


    const handleSelectedUsers = (value: any) => {

        if (selectedUsers.find((user: string) => value === user)) {
            setSelectedUsers(current => current.splice(current.indexOf(value), 1))
        }

        else setSelectedUsers(current => [value, ...current])
    }

    const handleUserClick = multiSelect ? handleSelectedUsers : createGroup

    return (
        <section>
            <button onClick={() => setMultiSelect(!multiSelect)}>
                Select multiple
            </button>


            <button onClick={() => multiSelect ? createGroup(selectedUsers) : undefined}>
                Create group
            </button>

            {allConnections.map((connect: any) => (
                <div key={connect.username} onClick={() => handleUserClick(connect.username)} >
                    <h3 >{connect.username}</h3>
                </div>
            ))}

            {JSON.stringify(selectedUsers, null, 4)}
            <h3>Is multi: {multiSelect ? "true" : "false"}</h3>

        </section>
    )
}

