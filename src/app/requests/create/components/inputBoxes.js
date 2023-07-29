"use client"

import { Button, Stack } from "@mui/material";
import { Autocomplete } from "@mantine/core";

import { useReducer } from "react";
import { TextInput, Textarea } from "@mantine/core";
import { categoryData } from "../../../../utils/data/categoryData";
import styles from './inputBoxes.module.scss'

export default function InputBoxes(props) {
    const reducer = (state, dispatch) => {
        return {
            ...state,
            [dispatch.name]: dispatch.value
        }
        }

        
    



    async function handleSubmit() {
        const form = new FormData()
        form.append('file', './png.png')
        await fetch('/api/images', {
            method: 'POST',
            body: JSON.stringify({
                username: props.session.user.username,
                date: new Date(),
                resource: state.resource,
                goal: state.goal,
                metric: state.metric,
                description: state.description,
                category: state.category,
                details: state.details,
                image: form


            })
        })
    }
    
    const [state, dispatch] = useReducer(reducer, { 
        resource: "",
        goal: "",
        category: "",
        details: "",
        description: "",
        metric: ""

    })


    return (
        <Stack className={styles.container}>

<Stack className={styles.sharedInput} direction={"row"} spacing={2}>
               
                
                <Autocomplete // You can add grouping to this using the group property
                label="Resource"
                id="resource"
                placeholder="Request any resource"
                value={state.category}
                onChange={(event) => dispatch({ 
                    name: "category",
                    value: event.target.value  })} 
                data={categoryData}
            />

<Autocomplete 
                label="Category"
                id="category"
                placeholder="Type of resource"
                value={state.metric} 
                onChange={(event) => dispatch({
                    name: "Category",
                    value: event.target.value  })}
                    data={categoryData}
                />

                </Stack>
           
                <Textarea
                onChange={(event) => dispatch({ 
                    name: "details",
                    value: event.target.value  })} 
                    placeholder="details" 
                    label="Details" 
                    minRows={2}
                    value={state.details} />

                    <Stack className={styles.sharedInput} direction={"row"} spacing={2}>
               
                <TextInput
                onChange={(event) => dispatch({ 
                    name: "goal",
                    value: event.target.value  })} 
                id="goal" 
                placeholder="Goal" 
                label="Goal" 
                 value={state.goal} />

                <Autocomplete 
                label="Metric"
                id="metric"
                placeholder="lbs, oz, $, etc"
                value={state.metric} 
                onChange={(event) => dispatch({
                    name: "metric",
                    value: event.target.value  })}
                    data={[
                        { label: 'Dollars', value: 'Dollars' },
                        { label: 'Hours', value: 'Hours' },
                        { label: 'Days', value: 'Days' },
                        { label: 'Weeks', value: 'Weeks' },
                    ]}
                />
                
                </Stack>

               
               
                <Textarea
                 onChange={(event) => dispatch({ 
                    name: "description",
                    value: event.target.value  })} 
                 id="Description" 
                 placeholder="Enter a description" 
                 label="Description" 
                 minRow={4}
                 value={state.description} />

                 <Stack className={styles.upload } direction={"row"} spacing={2}>
                   
                   
                    </Stack>
                
                <Button variant="filled" onClick={handleSubmit} color="primary">Submit Resource</Button>
            </Stack>
    )

}