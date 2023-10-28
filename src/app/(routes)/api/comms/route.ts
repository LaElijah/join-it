import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import authOptions from "../auth/[...nextauth]/options";

// Valuidates access to a group and privilages
export async function GET(req: any) {
  try {
    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: "failure" });
  }
}
