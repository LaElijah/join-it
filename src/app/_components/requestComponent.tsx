
import { Stack } from "@mui/material"
import RequestsHeader from "./elements/requestsHeader"
import styles from '@/app/_styles/components/list.module.scss'
import RequestsActions from "./requestsActions"



export default function RequestComponent({ requests }: any) {



    return (

        <Stack direction={"column"} className={styles.options} >

            <RequestsHeader />



            <RequestsActions requests={JSON.stringify(requests)} />

        </Stack>
    )
}