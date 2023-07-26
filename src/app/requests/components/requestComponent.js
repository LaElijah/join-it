
"use client"

import { Autocomplete, SegmentedControl } from "@mantine/core"
import { Stack } from "@mui/material"
import RequestList from "./requestList"



import { useState } from "react";


export default function RequestComponent(props) {
    const [category, setCategory] = useState("")
    const [segment, setSegment] = useState("")

    const handleSegmentChange = (event) => {
        setSegment(event.target.value)
    }

    const handleCategoryChange = (event) => {
        setCategory(event.target.value)
    }

   
        


    return (

        <Stack direction={"column"} >
        <Stack direction={"row"}  >
            <SegmentedControl
                value={segment}
                onChange={handleSegmentChange}
                data={[
                    { label: 'Furthest to Goal', value: 'FtG' },
                    { label: 'Closest to Goal', value: 'CtG' },
                ]}
            />
            <Autocomplete // You can add grouping to this using the group property
                label="Category"
                placeholder="Search for a category"
                value={category}
                onChange={handleCategoryChange}

                data={[
                    { value: 'Rice', label: 'Rice', group: 'Food' },
                    { value: 'Beans', label: 'Beans', group: 'Food' },
                    { value: 'Bread', label: 'Bread', group: 'Food' },
                    { value: 'rent', label: 'Rent', group: 'Housing' },
                    { value: 'mortgage', label: 'Mortgage', group: 'Housing' },
                    { value: 'utilities', label: 'Utilities', group: 'Housing' },
                    { value: 'car', label: 'Car', group: 'Transportation' },
                    { value: 'bus', label: 'Bus', group: 'Transportation' },
                    { value: 'train', label: 'Train', group: 'Transportation' },
                    { value: 'gas', label: 'Gas', group: 'Transportation' },
                    { value: 'insurance', label: 'Insurance', group: 'Transportation' },
                    { value: 'medical', label: 'Medical', group: 'Medical' },
                    { value: 'dental', label: 'Dental', group: 'Medical' },
                    { value: 'vision', label: 'Vision', group: 'Medical' },
                    { value: 'prescriptions', label: 'Prescriptions', group: 'Medical' },
                    { value: 'clothing', label: 'Clothing', group: 'Clothing' },
                    { value: 'hygiene', label: 'Hygiene', group: 'Clothing' },
                    { value: 'financial', label: 'Financial', group: 'General' },
                ]}
            />

            


        </Stack>

        <RequestList data={props.data} />

        </Stack>
    )
}