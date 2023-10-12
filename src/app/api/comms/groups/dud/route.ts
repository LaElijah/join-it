import { NextResponse } from "next/server";
import Group from "@/app/_utils/models/group";
import dbConnection from "@/app/_utils/db/dbConnection";
import User from "@/app/_utils/models/user";
import bcrypt from "bcrypt";
import { headers } from "next/headers";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";

//Creates a new group
// verifies that a session exists
// verifies that the user exists
// if user exists accepts payload
// hashes the group name
// creates a new group
// adds the user to the group
// saves the user
// redirects to comms page
export async function POST(req: any) {
  try {
    const session = await getServerSession(authOptions);

    const body = await req.json();
    await dbConnection();

    const user = await User.findOne({ _id: session.user.id });
    if (!user) {
      return NextResponse.json({ status: "failure" });
    }

    const hashedGroupName = await bcrypt.hash(body.groupName, 10);

    const group = new Group({
      access_key: hashedGroupName,
      users: [user._id],
      requestedUsers: [],
      banned: [],
      messages: [],
    });

    await group.save();

    user.groups.push(group._id);

    await user.save();

    return NextResponse.redirect("/comms");
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: "failure" });
  }
}

// Returns a list of the groups that the user is in
// checks the users session and uses the user id to find the user
export async function GET(req: any) {
  const userId = req.headers.get("user-id");
  console.log(userId);

  await dbConnection();

  const user = await User.findOne({ _id: userId });

  if (!user) {
    return NextResponse.json({ status: "failure" });
  }

  const groups = await Group.find({ _id: { $in: user.groups } });

  return NextResponse.json({ status: "success", groups: groups });
}
