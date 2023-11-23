"use client"
import { useDisclosure } from "@mantine/hooks"
import { Modal } from "@mantine/core"
import CommmunityInputs from "./communityInputs"





export default function CommunityModalButton({children}: any) {

    const [opened, {open, close}] = useDisclosure(false)

    return (
        <>
        <Modal fullScreen opened={opened} onClose={close} >
            <CommmunityInputs />
        </Modal>

        <button onClick={open}>{children}</button>
        </>
    )
}