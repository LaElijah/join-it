import { NextResponse } from "next/server";
import authOptions from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Group from "@/app/_utils/models/group";
import User from "@/app/_utils/models/user";


export async function POST(req: any) {
  try {

    const { groupName, username } = await req.json()
    const user = await User.findOne({ username: username}).populate("groups")

    const group = user.groups.find((group: any) => group.groupName === groupName)

    if (group) {
      return NextResponse.json({ payload: {group} })
    } else {
      return NextResponse.json({
        status: "failure", 
      })
    }

  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: "failure" });
  }
}
