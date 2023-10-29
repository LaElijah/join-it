"use client"

import { useState, useMemo, useCallback } from "react"
import { Autocomplete } from "@mantine/core"
import { debounce } from "@/app/_utils/tools/debounce"

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
   

    const handleSearch = (event: any) => {
        setLoading(true)
        setSearch(event)
        
        debouncedSearch(JSON.stringify({
            search: event,
            filter,
            page
        }))
    }


    return (
        <section>
            <Autocomplete 
            value={search} 
            onChange={handleSearch} 
            data={[...Array.from(new Set(users?.map((user: any) => user.username)))]}
            />
            <p>{loading ? "true" : "false"}</p>

        </section>
    )
}
