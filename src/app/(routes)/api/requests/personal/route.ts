import dbConnection from "@/app/_utils/db/dbConnection";
import Request from "@/app/_utils/models/request";
import { NextResponse } from "next/server";

export async function GET(req: any) {
  console.log("GET");
  await dbConnection();
  try {
    const data = await req.json();

    const requests = await Request.find({
      username: data.username,
    });
    return NextResponse.json({ status: "success", data: requests });
  } catch (error) {
    return NextResponse.json({ status: "failure" });
  }
}
