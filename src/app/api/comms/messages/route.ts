import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import authOptions from '@/app/api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'
import eventType from '@/app/_utils/kafka/types/message'
import { kafka } from '@/app/_utils/kafka/kafka'
import dbConnection from '@/app/_utils/db/dbConnection'
import User from '@/app/_utils/models/user'
import Message from '@/app/_utils//models/message'


const producer = kafka.producer({ 
    groupId: 'join-message-group',
})


// Sends a message to a user
// verifies that a session exists
// verifies that the user exists
// accepts payload
// creates a new message
// saves the message
// queues the message to kafka
// redirects to comms page
export async function POST() {

    try{
    const session = await getServerSession(authOptions)
    if (!session) {
        return redirect('/api/auth/signin?callbackUrl=/comms')
    }

    const body = await req.json()
    await dbConnection()

    const user = await User.findOne({ _id: session.user.id })

    if (!user) {
        return NextResponse.json({ status: "failure" })
    }

    const message = {
        from: user._id,
        to: body.to,
        message: body.message,
        timestamp: Date.now()
    }
    const document = new Message({ ...message })

    await document.save()
    await queueMessage(message)

    return NextResponse.redirect('/comms')
} catch (error) {
    console.log(error)
    return NextResponse.json({ status: "failure" })

}
}




async function queueMessage(message) {

    const success = await producer.send({
        topic: 'messaging-service',
        messages: [
            {value: eventType.toBuffer(message)}
        ]
    });

    if (success) {
        console.log("Message queued successfully");
    } else {
        console.log("Message queue failed");
    }
}