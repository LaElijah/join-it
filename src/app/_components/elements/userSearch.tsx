"use client"
import SearchBar from "./searchBar"
import Link from "next/link"
import { Combobox } from "@mantine/core"

type Option = {
    key: string | number,
    value: string,
    group? : string,
    data?: any
}


function UserOption({key, value, data}: Option) {

    return (
        <Link key={key} href={`/comms/peers/${data._id}`}>
             <Combobox.Option value={value} key={key}>
            <img src={data.profile} />
            <h3>{value}</h3>
            </Combobox.Option>

        </Link>
    )
}


export default function UserSearch() {
    const handleQuery = (data: any) =>{
        const options = data.payload.users.map((user: any, index: number) => {
            return {
            key: index,
            value: user.username,
            data: user
            }
        })
        console.log("options", options)
     return [...options]
    }
    
    return <SearchBar 
    url='/api/comms/user' 
    // onQuery={handleQuery} 
    element={UserOption} 
    dataLabel="users"

    />
}