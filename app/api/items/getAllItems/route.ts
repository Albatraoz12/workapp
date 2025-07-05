import { connectMongoDB } from "@/lib/mongodb";
import Item from "@/models/item";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await connectMongoDB();
    const data = await Item.find();

    return NextResponse.json({ message: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error occurred while registering the Item" },
      { status: 500 }
    );
  }
}
