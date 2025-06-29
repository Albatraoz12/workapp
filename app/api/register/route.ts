import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password, workPlace } = await req.json();
    const hasedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    await User.create({
      name,
      email,
      password: hasedPassword,
      workPlace,
    });

    return NextResponse.json({ message: "User registered!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error occurred while registering the user" },
      { status: 500 }
    );
  }
}
