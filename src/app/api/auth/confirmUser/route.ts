import { NextResponse, NextRequest} from "next/server";
import User from '@/app/_utils/models/user'
import dbConnection from '@/app/_utils/db/dbConnection'

export async function POST(req: NextRequest) {
    try {
        await dbConnection()
        const body = await req.json()
        const databaseUser = await User.findOne({ username: body.username })
      
        console.log(databaseUser)
        if (databaseUser !== null) {
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
