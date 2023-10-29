import { NextResponse } from "next/server";
import User from "@/app/_utils/models/user";
import dbConnection from "@/app/_utils/db/dbConnection";



export async function GET() {

    try {
        await dbConnection()
        const users = await User.find({})

        return NextResponse.json({
            status: "success",
            payload: {
                users
            }
        })
    }
    catch (error) {

        console.log(error)
        return NextResponse.json({
            message: "failure"
        })
    }
}