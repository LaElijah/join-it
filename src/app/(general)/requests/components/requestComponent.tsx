
"use client"

import { Autocomplete, SegmentedControl } from "@mantine/core"
import { Stack } from "@mui/material"
import RequestList from "./requestList"
import styles from './list.module.scss'
import Link from "next/link"
import { categoryData } from "../../../_utils/data/categoryData"



import { useState } from "react";


export default function RequestComponent(props) {
    const [category, setCategory] = useState("")
    const [segment, setSegment] = useState("")

    function handleSegmentChange(event){
       setSegment(event)
    }

    function handleCategoryChange(event) {
        setCategory(event)
    }

   
        


    return (

        <Stack direction={"column"}className={styles.options} >
        
        <Stack direction={"column"} className={styles.filterBody}  >
        
        <div className={styles.linkBody}>
            <h2>Current Requests</h2>
        <Link href={"/requests/create"} >Request a resource</Link>
        </div>


        <Stack direction={"row"}   className={styles.filters}  >
            <SegmentedControl
                label="Sort by"
                
                value={segment}
                onChange={handleSegmentChange}
                data={[
                    { label: 'Furthest from goal', value: 'Furthest' },
                    { label: 'Closest', value: 'Closest' },
                ]}
            />
            <Autocomplete // You can add grouping to this using the group property
                label="Category"
                placeholder="Search for any category"
                value={category}
                onChange={handleCategoryChange}

                data={categoryData}
            />


            


        </Stack>
        
</Stack>

        <RequestList data={props.data} />

        </Stack>
    )
}