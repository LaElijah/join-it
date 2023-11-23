import { TextInput } from "@mantine/core"
import {
    IconCamera,
    IconTriangleFilled,
    IconAffiliate
} from "@tabler/icons-react"
import styles from "@/app/_styles/components/messageActions.module.scss"

export default function MessageActions({
    value,
    onChange,
    onEnter,
    onClick
}: {
    value: string,
    onChange: (event: any) => void,
    onEnter: () => void,
    onClick: () => void
}) {
    return (
        <footer className={styles.container}>
            <IconCamera />
            <TextInput 
            value={value}
            onChange={onChange}
            onKeyDown={(event) => { if (event.code === "Enter") onEnter() }}
            onClick={onClick}
            />
            <IconAffiliate />
            <IconTriangleFilled onClick={onEnter}/>
            {/**TODO: Put a modal here for image uploads */}
        </footer>

    )
}