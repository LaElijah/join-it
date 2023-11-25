import { NextRequest, NextResponse } from "next/server";
import Group from "@/app/_utils/models/group";
import dbConnection from "@/app/_utils/db/dbConnection";
import User from "@/app/_utils/models/user";
import bcrypt from "bcrypt";
import { headers } from "next/headers";
import { getServerSession } from "next-auth";
import authOptions from "@/app/(routes)/api/auth/[...nextauth]/options";
import UserSearch from "@/app/_components/elements/userSearch";
import message from "@/app/_utils/models/message";
//Creates a new group
// verifies that a session exists
// verifies that the user exists
// if user exists accepts payload
// hashes the group name
// creates a new group
// adds the user to the group
// saves the user
// redirects to comms page


interface GroupProps {
  groupName: string
  members: string[],
  requestedMembers: string[],
  banned: string[],
  messages: string[],
  lastActive: string

}

export async function GET(req: NextRequest) {


  const groupId = req.headers.get("groupId");
  const timestamp: string | null = req.headers.get("timestamp")
  if (!timestamp) return NextResponse.json({})

  console.log(timestamp)
  console.log(groupId)
  await dbConnection();

  const group = await Group.findOne({ _id: groupId });
  if (!group) return NextResponse.json({ status: "failure" });
  const newMessages = group.messages.filter((message: any) => message.createdAt >= new Date(timestamp))

  // find messages after timestamp
  // TODO: Return all messages sent after the date sent by the user 
  return NextResponse.json({ status: "success", payload: { newMessages } });
}


export async function POST(req: any) {
  try {
    const { selectedUsers, groupName } = await req.json();
    await dbConnection();
    const session = await getServerSession(authOptions);
    const user = await User.findOne({ _id: session.user.id })
      .populate(
        [
          {
            path: "groups", model: Group
          },
          {
            path: "groupRequests", model: Group
          },
        ]
      );

    if (!user) {
      return NextResponse.json({ status: "failure" });
    }


    if (groupName) {
      const groupMembers = groupName.split(/,/g)

      /**
       * if the length of the split string into array is more than 2 than proceed normally
       * if the length is 2 make an array like below and search 
       */


      if (groupMembers.length === 2) {
        const alternateMessageParams = [groupName, `${groupMembers[1]},${groupMembers[0]}`]
        
        const group = await Group.findOne({ groupName: { $in: alternateMessageParams } })
        console.log("Serving found group", group)

        if (group) return NextResponse.json({
          status: "success",
          payload: { group }
        })
      }
      else {
        const group = await Group.findOne({ groupName })
        console.log("Serving found group", group)

        if (group) return NextResponse.json({
          status: "success",
          payload: { group }
        })

      }
      return NextResponse.json({
        status: 'failure'
      })
    }


    else if (selectedUsers) {

      const foundUsers = await User.find({ username: { $in: selectedUsers } })
      const userIds = (
        foundUsers)
        .map((user: any) => user._id)
      const foundUserNames = (
        foundUsers)
        .map((user: any) => user.username)






      const knownGroup = (userIds.length === 1 ?
        user.groups.find((group: any) => {
          if (
            (group.members && group.members.length === 2)
            || (group.members && group.requestedMembers.length === 2)
          ) {
            return (

              ((userIds.find(id => group.members.includes(id))) !== undefined)
              || ((userIds.find(id => group.requestedMembers.includes(id))) !== undefined)
            )
          }
        })
        : undefined)



      if (knownGroup) {
        console.log("here")
        return NextResponse.json({
          payload: { group: knownGroup }
        })

      }




      const groupData: GroupProps = {
        groupName: "",
        members: [user._id],
        requestedMembers: [],
        banned: [],
        messages: [],
        lastActive: `${new Date()}`
      }

      groupData.groupName = groupName || foundUserNames.join() + ',' + session.user.username



      const group = new Group({ ...groupData });

      user.groups.push(group._id);
      foundUsers.forEach(async (user) => {
        if (user.settings.public["canMessage"]) group.members.push(user._id)
        else group.requestedMembers.push(user._id)
        user.groups.push(group._id)
        await user.save()
      })
      // push group to added users too 

      await group.save();
      await user.save()

      return NextResponse.json({
        payload: { group }
      })

    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: "failure" });
  }
}

// Returns a list of the groups that the user is in
// checks the users session and uses the user id to find the user
