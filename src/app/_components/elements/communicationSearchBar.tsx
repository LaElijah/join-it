"use client"

import { useState, useMemo } from "react"
import { Autocomplete } from "@mantine/core"
import { debounce } from "@/app/_utils/tools/debounce"


export default function CommunicationSearchBar() {
    const [search, setSearch] = useState("")
    const [users, setUsers] = useState([])

    const debouncedSearch = debounce(
        async () => { 
            const response = await fetch('/api/comms/user')
            const {payload} = await response.json()
            console.log(payload)
            if (users) setUsers(payload.users)
        }
    ,3000)
    const handleSearch = useMemo((event: any) => {
        setSearch(event)
        debouncedSearch()
        
    }, [])
    return (
        <section>
            <Autocomplete 
            value={search} 
            onChange={handleSearch} 
            data={users}
            />

        </section>
    )
}
