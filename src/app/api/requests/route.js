import { NextResponse } from "next/server";

import dbConnection from '../../../utils/db/dbConnection'
import Request from '../../../utils/models/request'





export async function GET() {
  console.log("GET Requsts")
  await dbConnection()
    try {
        const requests = await Request.find({})
        console.log(requests)
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
            ...data,
          }
        )
        console.log(document)
        await document.save()
        return NextResponse.json({ status: "success"})

      } catch (error) {
        return NextResponse.json({ status: "failure" })

      }

}