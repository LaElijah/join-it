import { NextRequest, NextResponse } from "next/server";
import User from "@/app/_utils/models/user";
import dbConnection from "@/app/_utils/db/dbConnection";

const API_LIMIT = process.env.API_LIMIT || "20"


export async function POST(req: NextRequest) {

    try {
        const { search, filter, page } = await req.json()
        console.log(filter)
        let workingPage = page || 0

        const index = Math.floor(workingPage * parseInt(API_LIMIT) )
        let searchParams: any = {}
        if (search) searchParams.username = search
       
        await dbConnection()
        const users = await User.find({username: { $regex: new RegExp(`.*${search}.*`)},...filter}).skip(index).limit(parseInt(API_LIMIT))


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