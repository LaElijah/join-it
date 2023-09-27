"use state"
import { useState } from "react"
import { Stack } from "@mui/material"
import { Autocomplete, SegmentedControl } from "@mantine/core"
import { categoryData } from "@/app/_utils/data/categoryData"
import styles from '@/app/_styles/components/list.module.scss'





export default function RequestsOptions() {
    const [category, setCategory] = useState("")
    const [segment, setSegment] = useState("")





    return (
        <Stack direction={"row"} className={styles.filters}  >
                <SegmentedControl
                    value={segment}
                    onChange={(event: any) => setSegment(event)}
                    data={[
                        { label: 'Furthest from goal', value: 'Furthest' },
                        { label: 'Closest', value: 'Closest' },
                    ]}
                />
                <Autocomplete // You can add grouping to this using the group property
                    label="Category"
                    placeholder="Search for any category"
                    value={category}
                    onChange={(event: any) => setCategory(event)}
                    data={categoryData}
                />
            </Stack>
    )
}
