import { connectMongoDB } from "@/lib/mongodb";
import Item from "@/models/item";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { productName, supplierName, orderWhen, quantity, storedLocation } =
      await req.json();
    console.log(productName, supplierName, orderWhen, quantity, storedLocation);
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
