"use client"

import { Button, Stack } from "@mui/material";
import { useReducer } from "react";
import { TextInput, Textarea, Autocomplete, NumberInput } from "@mantine/core";
import { categoryData } from "@/utils/data/categoryData";
import styles from './inputBoxes.module.scss'
import FileUploader from "../fileUploader/fileUploader";
import { urlToFile } from "@/utils/images/imageUtils";

export default function InputBoxes(props) {

    const reducer = (state, dispatch) => {
        return {
            ...state,
            [dispatch.name]: dispatch.value
        }
    }


    const [state, dispatch] = useReducer(reducer, {
        resource: "",
        goal: "",
        category: "",
        details: "",
        description: "",
        metric: "",
        croppedImage: null,

    })

    async function handleSubmit() {
        const form = new FormData()
        const file = await urlToFile(state.croppedImage, "croppedImage.png");

        const body = {
            
            resource: state.resource,
            goal: state.goal,
            category: state.category,
            details: state.details,
            description: state.description,
            metric: state.metric,
            username: props.session.user.username,
            
        }

        form.append('file', file)
        form.append('body', JSON.stringify(body))

        await fetch('/api/requests', {
            method: 'POST',
            body: form
        })
    }




    return (
        <Stack className={styles.container}>

            <Stack className={styles.sharedInput} direction={"row"} spacing={2}>


                <Autocomplete // You can add grouping to this using the group property
                    label="Resource"
                    id="resource"
                    placeholder="Request any resource"
                    value={state.resource}
                    onChange={(event) => dispatch({
                        name: "resource",
                        value: event
                    })}
                    data={categoryData}
                />

                <Autocomplete
                    label="Category"
                    id="category"
                    placeholder="Type of resource"
                    value={state.category}
                    onChange={(event) => dispatch({
                        name: "category",
                        value: event
                    })}
                    data={categoryData}
                />

            </Stack>

            <Textarea
                onChange={(event) => dispatch({
                    name: "details",
                    value: event.target.value
                })}
                placeholder="Enter details about your request..."
                label="Details"
                minRows={2}
                value={state.details} />

            <Stack className={styles.sharedInput} direction={"row"} spacing={2}>

                <NumberInput
                    onChange={(event) => dispatch({
                        name: "goal",
                        value: event
                    })}
                    id="goal"
                    placeholder="Enter a goal"
                    min={0}
                    label="Goal"
                    value={state.goal} />

                <Autocomplete
                    label="Metric"
                    id="metric"
                    placeholder="lbs, oz, $, etc"
                    value={state.metric}
                    onChange={(event) => dispatch({
                        name: "metric",
                        value: event
                    })}
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
                    value: event.target.value
                })}
                id="Description"
                placeholder="Enter a description..."
                label="Description"
                minRows={4}
                value={state.description} />

            <div>
                <FileUploader state={state} dispatch={dispatch} />
            </div>



            <Button variant="filled" onClick={handleSubmit} color="primary">Submit Resource</Button>
        </Stack>
    )

}