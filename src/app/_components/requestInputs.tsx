"use client"


import { useReducer } from "react";
import { Stack } from "@mui/material";
import { Textarea, Autocomplete, NumberInput, Button } from "@mantine/core";
import { resourceData, categoryData, metrics } from "@/app/_utils/data/categoryData";
import { urlToFile } from "@/app/_utils/images/imageUtils";
import { useRouter } from "next/navigation";
import FileUploader from "./fileUploader";
import styles from '@/app/_styles/elements/requestInputs.module.scss'


export default function RequestInputs(props: any) {

    const router = useRouter()

    const reducer = (state: any, dispatch: any) => {
        return {
            ...state,
            [dispatch.name]: dispatch.payload
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
        error: null

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

        console.log(form)

        const response = await fetch('/api/requests', {
            method: 'POST',
            body: form
        })

        const data = await response.json()

        if (data.status === "success") {
            router.push('/requests')
        }
        else {
            dispatch({ name: "error", payload: data.message })
        }
    }

   
 


    return (
        <Stack className={styles.container}>
            <h2>Request a resource</h2>

            <Stack className={styles.sharedInput} direction={"row"} spacing={2}>


                <Autocomplete // You can add grouping to this using the group property
                    label="Resource"
                    id="resource"
                    placeholder="Request any resource"
                    value={state.resource}
                    data={resourceData}
                    onChange={(event) => {
                        dispatch({
                        name: "resource",
                        payload: event
                    })}}
                />

                <Autocomplete
                    label="Category"
                    id="category"
                    placeholder="Type of resource"
                    value={state.category}
                    onChange={(event) => {
                        dispatch({
                        name: "category",
                        payload: event
                    })}}
                    data={categoryData}
                />

            </Stack>

            <Textarea
                onChange={(event) => dispatch({
                    name: "details",
                    payload: event.target.value
                })}
                placeholder="Enter details about your request..."
                label="Details"
                minRows={2}
                value={state.details} />

            <Stack className={styles.sharedInput} direction={"row"} spacing={2}>

                <NumberInput
                    onChange={(event) => dispatch({
                        name: "goal",
                        payload: event
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
                        payload: event
                    })}
                    data={metrics}
                />

            </Stack>



            <Textarea
                onChange={(event) => dispatch({
                    name: "description",
                    payload: event.target.value
                })}
                id="Description"
                placeholder="Enter a description..."
                label="Description"
                minRows={6}
                value={state.description} />

            <div>
                <FileUploader
                    label="Upload an image"
                    width={64}
                    height={64}
                    dispatch={dispatch}
                />
            </div>



            <Stack
                direction={"row"}
                spacing={2}
                sx={{
                    width: "100%",
                    justifyContent: "flex-end"

                }}
            >


                <Button variant="light" onClick={() => router.push('/requests')}>Cancel</Button>
                <Button variant="filled" onClick={handleSubmit} >Submit</Button>


            </Stack>
        </Stack>
    )

}