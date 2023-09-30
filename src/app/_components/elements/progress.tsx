"use client"

import { Progress } from '@mantine/core';



export default function Requests(props: any) {
    return (
        <>
        <Progress value={props.value}  />
        </>
    )
}