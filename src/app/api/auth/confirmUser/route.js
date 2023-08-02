import { NextResponse } from "next/server";
import User from '@/app/_utils/models/user'
import dbConnection from '@/app/_utils/db/dbConnection'

export async function POST(req) {
    try {
        await dbConnection()
        const body = await req.json()
        const username = body.username
        console.log(username)
        const databaseUser = await User.findOne({ username: "test" })
      
        if (databaseUser) {
            return NextResponse.json({ exists: true })
        }
        else {
            return NextResponse.json({ exists: false })
        }

    }
    catch (error) {
        return NextResponse.json({ status: "failure" })
    }
}
