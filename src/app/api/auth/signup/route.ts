import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dbConnection from "@/app/_utils/db/dbConnection";
import User from "@/app/_utils/models/user";

export async function POST(req: any) {
  await dbConnection();
  try {
    const formRequest = await req.formData();

    const file = formRequest.get("file");
    const bodyStringified = formRequest.get("body");

    const body = JSON.parse(bodyStringified);

    const databaseUser = await User.findOne({ username: " body.username" });

    console.log(databaseUser);
    if (databaseUser) {
      return NextResponse.json({ status: "failure" });
    } else {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("api_key", `${process.env.CLOUDINARY_API_KEY}`);
      formData.append("upload_preset", "uploadProfile");
      formData.append("resource_type", "image");
      formData.append("cloud_name", `${process.env.CLOUDINARY_NAME}`);
      formData.append("api_secret", `${process.env.CLOUDINARY_SECRET}`);

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dx3xbo8tm/image/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      const image = await response.json();

      const hashedPassword = await bcrypt.hash(body.password, 10);

      const document = new User({
        email: body.email.toLowerCase(),
        username: body.username.toLowerCase(),
        password: hashedPassword,
        identity: { ...body.identity },
        profile: image.url,
      });

      console.log(document);
      await document.save();

      return NextResponse.json({ status: "success" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: "failure" });
  }
}
