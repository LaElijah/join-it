import { NextRequest, NextResponse } from "next/server";
import User from "@/app/_utils/models/user";
import dbConnection from "@/app/_utils/db/dbConnection";
import { getServerSession } from "next-auth";
import authOptions from "../../auth/[...nextauth]/options";

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


export async function PUT(req: NextRequest) {
    try {
        const hostUser = (await getServerSession(authOptions)).user
        const { user} = await req.json()

        const userData = await User.findOne({ username: user})
        const hostUserData = await User.findOne({ username: hostUser.username }).populate('friends')

        let isFollowing =true
        const userFound = hostUserData.friends.find((user: any) => {
            return user.username === userData.username
        })

        if (userFound) {
            hostUserData.friends.splice(hostUserData.friends.indexOf(userData._id), 1)
            await hostUserData.save()
            isFollowing = false
        }
        else {
            hostUserData.friends.push(userData._id)

        await hostUserData.save()
        isFollowing = true
        }
   
        return NextResponse.json({
            status: "success",
            payload: {
                isFollowing
            }
        })
    }
    catch (error) {

        console.log(error)
        return NextResponse.json({
            status: "failure",

        })
        
    }
}