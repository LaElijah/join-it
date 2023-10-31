"use client"
import SearchBar from "./searchBar"
import { Combobox } from "@mantine/core"
import { useRouter } from "next/navigation"
import styles from "@/app/_styles/elements/userSearch.module.scss"


type Option = {
    key: string | number,
    value: string,
    group? : string,
    data?: any
}



function UserOption({key, value, data}: Option) {
    const router = useRouter()

    return (
             <Combobox.Option className={styles.profileOption} onClick={() => router.push(`/comms/peers/${data._id}`)} value={value} key={key}>
            <img src={data.profile} width={32} height={32} />
            <h3>{value}</h3>
            </Combobox.Option>
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
    onQuery={handleQuery} 
    element={UserOption} 
    dataLabel="users"

    />
}