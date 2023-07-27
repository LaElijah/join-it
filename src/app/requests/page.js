import { Stack } from "@mui/material";
import Link from "next/link"
import RequestComponent from "./components/requestComponent";

export default async function Requests() {
    const getRequests = async () => {
        const response = await fetch('http://localhost:3000/api/requests', {
            method: 'GET',
        })
        const data = await response.json();
        return data;
    }

    const data = await getRequests()


    return (

           <section>
                <RequestComponent data={data} />
        </section>
        
    )
    }
