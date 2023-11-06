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

        const index = Math.floor(workingPage * parseInt(API_LIMIT))
        let searchParams: any = {}
        if (search) searchParams.username = search

        await dbConnection()
        const users = await User.find({ username: { $regex: new RegExp(`.*${search}.*`) }, ...filter }).skip(index).limit(parseInt(API_LIMIT))


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
        let isConnected
        await dbConnection()
        const hostUser = (await getServerSession(authOptions)).user


        const { user } = await req.json()

        const hostUserData = await User.findOne({ username: hostUser.username })
            .populate('connections')
            .populate('connectionRequests')

        const userData = await User.findOne({ username: user })


        const userFollows: any = hostUserData.connections.find((user: any) => user.username === userData.username) ? true : false
        const userRequested = hostUserData.connectionRequests.find((user: any) => user.username === userData.username) ? true : false
        
     

        // most closed Layer
        if ((
            !userData.settings.public["canFollow"]
            || (
                userData["privacyMode"] !== "PUBLIC"
                && userData["privacyMode"] !== "OPEN"
                && userData["privacyMode"] !== "CUSTOM"
            ))
            && !userFollows
            && !userRequested
        ) {
            return NextResponse.json({
                status: "failure",
                message: "You are unauthorized"

            })
        }

        // Request connection
        if ((
            userData["privacyMode"] !== "PUBLIC"
            && userData["privacyMode"] !== "OPEN"
        )
            && !userFollows
            && !userRequested) {
            // Push the request
            hostUserData.connectionRequests.push(userData._id)
            userData.connectionRequests.push(hostUserData._id)
            await hostUserData.save()
            await userData.save()
            isConnected = "PENDING"



            return NextResponse.json({
                status: "success",
                payload: {
                    isConnected: isConnected
                }
            })
        }


        // Direct connections
        if ((
            userData.settings.public["canFollow"]
            || (
                userData["privacyMode"] === "PUBLIC"
                || userData["privacyMode"] === "OPEN"
                || userData["privacyMode"] === "CUSTOM"
            ))
            && !userFollows
            && !userRequested
        ) {
            // add a follower
            hostUserData.connections.push(userData._id)
            userData.connections.push(hostUserData._id)
            await hostUserData.save()
            await userData.save()
            isConnected = "YES"


            return NextResponse.json({
                status: "success",
                payload: {
                    isConnected: isConnected
                }
            })
        }

        if (userRequested) {
            //Splice the request
            hostUserData.connectionRequests.splice(hostUserData.connectionRequests.indexOf(userData._id), 1)
            userData.connectionRequests.splice(userData.connectionRequests.indexOf(hostUserData._id), 1)
            await hostUserData.save()
            await userData.save()
            isConnected = "NO"


        }

        if (userFollows) {
            console.log("follower removed")
            // Splice the follower off
            hostUserData.connections.splice(hostUserData.connections.indexOf(userData._id), 1)
            userData.connections.splice(userData.connections.indexOf(hostUserData._id), 1)
            await userData.save()
            await hostUserData.save()
            isConnected = "NO"
        }

        return NextResponse.json({
            status: "success",
            payload: {
                isConnected: isConnected
            }
        })
    }
    catch (error) {

        console.log(error)
        return NextResponse.json({
            status: "failure",
            message: "An internal server error occurred"
        })

    }
}