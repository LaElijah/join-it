import { NextResponse } from "next/server";

import dbConnection from '../../../utils/db/dbConnection'
import Resource from '../../../utils/models/request'





export async function GET() {
  await dbConnection()
    try {
        const requests = await Request.find({})
        return NextResponse.json({ status: "success", data: requests})
      } catch (error) {
        return NextResponse.json({ status: "failure" })

      }
    }


export async function POST(req) {
  await dbConnection()
    try {
        const data = await req.json()
        const document = new Resource(
          {
            name: data.name,
            date: new Date(),
            request: data.request
          }
        )
        await document.save()
        return NextResponse.json({ status: "success"})

      } catch (error) {
        return NextResponse.json({ status: "failure" })

      }

}