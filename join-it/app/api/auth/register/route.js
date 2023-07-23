import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import dbConnection from '../../../../utils/db/dbConnection'
import User from '../../../../utils/models/user'





export async function POST(req) {
    await dbConnection()
    try {
        const data = await req.json()
        const databaseUser = await User.findOne({ username: data.username })
        console.log(data)


        if (databaseUser) {
            return NextResponse.json({ status: "failure" })
        }
        else {

            const hashedPassword = await bcrypt.hash(data.password, 10)

            const document = new User(
                {
                    username: data.username,
                    password: hashedPassword,
                }
            )

                console.log(document)
            await document.save()
            
            return NextResponse.json({ status: "success" })
        }

    } catch (error) {
        return NextResponse.json({ status: "failure" })

    }

}