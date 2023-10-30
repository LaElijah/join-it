"use client"

import { useState, useMemo, useCallback } from "react"
import { Autocomplete } from "@mantine/core"
import { debounce } from "@/app/_utils/tools/debounce"
import AutoCompleteSelect from "./autoCompleteSelect"

type Filter = {
    property?: string;
    value?: string;
} 

export default function CommunicationSearchBar() {
    const [search, setSearch] = useState("")
    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState<Filter>({})
    const [page, setPage] = useState(0)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const debouncedSearch = useMemo(() => debounce(
        async (body: any) => { 
            const response = await fetch('/api/comms/user',{
            method: "POST",
            body: body
        })
            const {payload, status} = await response.json()
            if (status === "failure") setError("An internal server error occured")
            if (users) setUsers(payload.users)
            setLoading(false)
        }
    ,800),[])
   

    const handleSearch = (value: string) => {
        setLoading(true)
        setSearch(value)
        
        debouncedSearch(JSON.stringify({
            search: value,
            filter,
            page
        }))
    }

    const options = Array.from(new Set(users?.map((user: any) => user.username))).map((username, index) => {
        return {
            key: index,
            value: username, 
        }
    })

    return (
        <section>
            <AutoCompleteSelect 
            value={search} 
            onChange={handleSearch} 
            options={[
                {
                    group: "group-1",
                    key: "0",
                    value: "value-1"
                },
                {
                    group: "group-2",
                    key: "1",
                    value: "value-2"
                },
                {
                    key: "2",
                    value: "value-3"
                },
                {
                    key: "3",
                    value: "value-4"
                }
            ]}
            />
            <p>{loading ? "true" : "false"}</p>
            {search}

        </section>
    )
}
