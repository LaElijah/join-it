"use client"
import RequestInputs from "./requestInputs";
import { Modal } from "@mantine/core";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";




export default function RequestModalButton({session, children}: any) {
    const [opened, { open, close }] = useDisclosure(false);


    return (
        <>
        <Modal fullScreen opened={opened} onClose={close} >
        <RequestInputs session={session} />
        </Modal>
        <button onClick={open}>{children}</button>
        </>
    )
}