"use client"
import RequestList from "./requestsList"
import RequestOptions from "./elements/requestsOptions"


export default function RequestsActions(props: any) {

    const requests = JSON.parse(props.requests)
 

    return (
        <div>
            <RequestOptions />
            <RequestList requests={requests} />
        </div>

    )
}