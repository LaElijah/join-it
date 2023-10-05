
import { NextResponse } from 'next/server'


export async function POST(req: any) {

    try {
        const body = await req.json()
        console.log(body)
        const response = await fetch('http://54.209.121.134/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const data = await response.json()
        console.log(data)
        return NextResponse.json({ status: "success" })

    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ status: "failure" })
    }
}