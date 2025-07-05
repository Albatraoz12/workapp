import { connectMongoDB } from "@/lib/mongodb";
import Item from "@/models/item";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    console.log(session);

    const { productName, supplierName, orderWhen, quantity, storedLocation } =
      await req.json();
    await connectMongoDB();
    await Item.create({
      productName,
      supplierName,
      orderWhen,
      quantity,
      storedLocation,
    });

    return NextResponse.json({ message: "Item registered!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error occurred while registering the Item" },
      { status: 500 }
    );
  }
}
