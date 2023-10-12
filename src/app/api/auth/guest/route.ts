import { NextResponse } from "next/server";
import generator from "generate-password-ts";
import User from "@/app/_utils/models/user";
import dbConnection from "@/app/_utils/db/dbConnection";
import bcrypt from "bcrypt";

export async function GET() {
  try {
    const profiles = [
      "http://res.cloudinary.com/dnh4epuad/image/upload/v1695840275/Profile%20Images/m3vatalkpocgqe9ixfpj.jpg",
      "http://res.cloudinary.com/dnh4epuad/image/upload/v1695840275/Profile%20Images/m3vatalkpocgqe9ixfpj.jpg",
      "http://res.cloudinary.com/dnh4epuad/image/upload/v1695840275/Profile%20Images/m3vatalkpocgqe9ixfpj.jpg",
    ];

    await dbConnection();

    const generateCredentials = async (): Promise<{
      username: string;
      unHashedPassword: string;
      password: string;
    }> => {
      const username = `user-${
        Date.now().toString(36) + Math.random().toString(36).substring(13)
      }`;
      const unHashedPassword = generator.generate({
        length: 12,
        numbers: true,
      });

      const password = await bcrypt.hash(unHashedPassword, 10);

      return {
        username,
        unHashedPassword,
        password,
      };
    };

    const { unHashedPassword, username, password } =
      await generateCredentials();

    const document = new User({
      username,
      password,
      email: "example@provider.com",
      profile: profiles[Math.floor(Math.random() * profiles.length)],
      expireAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    await document.save();

    return NextResponse.json({
      status: "success",
      message: "Guest user generated",
      payload: {
        username: username,
        password: unHashedPassword,
      },
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      status: "failure",
      message: "Could not generate credentials",
    });
  }
}
