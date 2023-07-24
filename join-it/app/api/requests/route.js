import { NextResponse } from "next/server";

import dbConnection from '../../../utils/db/dbConnection'
import Request from '../../../utils/models/request'





export async function GET() {
  console.log("GET")
  await dbConnection()
    try {
        const requests = Request.find({})
        return NextResponse.json({ status: "success", data: requests})
      } catch (error) {
        return NextResponse.json({ status: "failure" })

      }
    }


export async function POST(req) {
  console.log("POST")
  await dbConnection()
    try {
        const data = await req.json()
        const document = new Request(
          {
            name: data.name,
            date: new Date(),
            request: data.request
          }
        )
        console.log(document)
        await document.save()
        return NextResponse.json({ status: "success"})

      } catch (error) {
        return NextResponse.json({ status: "failure" })

      }

}