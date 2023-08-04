
import { NextResponse } from 'next/server'
import dbConnection from '@/app/_utils/db/dbConnection'
import Request from '@/app/_utils/models/request'
import User from '@/app/_utils/models/user'
import { getServerSession } from 'next-auth/next'
import authOptions from '../../auth/[...nextauth]/options'


export async function GET(req) {
    try {
        await dbConnection()

        const id = req.headers.get('query')
        console.log(id)

        const post = await Request.findOne({ _id: id })

        // if (post) {
        //     const user = await User.findOne({ _id: post.user })
         
        //     const publicUserData = {
        //         username: user.username,
        //         profile: user.profile,
        //         id: user._id,
        //         identity: user.identity
        //     }
            return NextResponse.json({ status: "success", data: post  })
        // }
        // else {
        //     return NextResponse.json({ status: "failure" })
        // }
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ status: "failure" })
    }
}

export async function DELETE(req, res) {
    try {
        const session = await getServerSession(authOptions)
        await dbConnection()
        console.log(session)
        if (!session) {
            return NextResponse.json({ status: "failure" })
        }
            else {
        const id = req.headers.get('query')
        console.log(id)
        const post = Request.findOne({ _id: id })
        if (post.userId !== session.user.id) {
            return NextResponse.json({ status: "failure" })
        }
        await Request.deleteOne({ _id: id })
        return NextResponse.json({ status: "success" })
            }
    }

    catch (error) {
        return NextResponse.json({ status: "failure" })
    }
}


        