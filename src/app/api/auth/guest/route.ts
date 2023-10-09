import { NextResponse } from "next/server";
import generator from "generate-password-ts"
import User from "@/app/_utils/models/user";
import dbConnection from "@/app/_utils/db/dbConnection";


export async function GET() {

    try {
        await dbConnection()

        const generateCredentials = (): {
            username: string,
            password: string
        } => {
            const username = `user-${Date.now().toString(36) + Math.random().toString(36).substring(13)}`;
            const password = generator.generate({
                length: 12,
                numbers: true,
            })

            return ({
                username,
                password
            })

        }

        const credentials = generateCredentials()

        const document = new User({
            ...credentials,
            expireAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        })

        await document.save()


        return NextResponse.json({
            status: "success",
            message: "Guest user generated",
            payload: {
                ...credentials
            }
        })

    }
    catch (error) {
        console.log(error)

        return NextResponse.json({
            status: "failure",
            message: "Could not generate credentials"
        })
    }
}