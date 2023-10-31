"use client"
import SearchBar from "./searchBar"
import Link from "next/link"

function UserOption({data}: any) {

    return (
        <Link href={`/comms/peers/${data._id}`}>
            <img src={data.profile} />
            <h3>{data.username}</h3>

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
    url='/api/comms/user' onQuery={handleQuery} element={<UserOption />} 

    />
}