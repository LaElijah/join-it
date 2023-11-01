import { TextInput } from "@mantine/core"
import {
    IconCamera,
    IconTriangleFilled
} from "@tabler/icons-react"
import styles from "@/app/_styles/components/messageActions.module.scss"

export default function MessageActions({
    value,
    onChange,
    onEnter
}: {
    value: string,
    onChange: (event: any) => void,
    onEnter: () => void,
}) {
    return (
        <footer className={styles.container}>
            <IconCamera />
            <TextInput 
            value={value}
            onChange={onChange}
            onKeyDown={(event) => { if (event.code === "Enter") onEnter() }}
            />
            <IconTriangleFilled onClick={onEnter}/>
        </footer>

    )
}