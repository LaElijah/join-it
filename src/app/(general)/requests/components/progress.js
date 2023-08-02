"use client"

import { Progress } from '@mantine/core';



export default function Requests(props) {
    return (
        <>
        <Progress value={props.value} label={`${props.value}%`} />
        </>
    )
}