"use client"

import { useState, useMemo } from "react"
import { debounce } from "@/app/_utils/tools/debounce"
import AutoCompleteSelect from "./autoCompleteSelect"

type Filter = {
    property?: string;
    value?: string;
} 

type Option = {
    key: string | number,
    value: string,
    group? : string,
    data?: any
}


export default function SearchBar({ 
    element: SelectElement,
    url,
    filter,
    delay = 800
}: {
    element?: JSX.Element,
    url: string,
    filter?: Filter,
    delay?: number
} ) 
    {
    const [search, setSearch] = useState("")
    const [data, setData] = useState<Option[]>([])
    const [page, setPage] = useState(0)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const debouncedSearch = useMemo(() => debounce(
        async (body: any) => { 
            const response = await fetch(url,{
            method: "POST",
            body: body
        })
            const data = await response.json()
           
            if (data.status === "failure") setError("An internal server error occured")
            console.log(data)

            const res = data.payload.users.map((element: any, index: number) => {
                return {
                    key: index,
                    value: element.username,
                    data: data
                }
            })
           console.log("res",res)
            setData(res)
            setLoading(false)
        }
    ,delay),[])
   

    const handleSearch = (event: any) => {
        setLoading(true)
        setSearch(event.target.value)
        
        debouncedSearch(JSON.stringify({
            search: event.target.value,
            filter,
            page
        }))
    }



    return (
        <section>
            <AutoCompleteSelect 
            value={search} 
            label="Find a user"
            onChange={handleSearch} 
            options={data}
            SelectElement={SelectElement}
            />
            <p>{loading ? "true" : "false"}</p>
            {search}

        </section>
    )
}