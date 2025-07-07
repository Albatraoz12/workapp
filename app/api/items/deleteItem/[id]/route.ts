import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectMongoDB } from "@/lib/mongodb";
import Item from "@/models/item";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    const session = await getServerSession(authOptions);

    if (!session)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await connectMongoDB();
    const item = await Item.findByIdAndDelete(id);

    if (!item)
      return NextResponse.json(
        { message: "item is already deleted!" },
        { status: 404 }
      );

    return NextResponse.json({ message: item }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: `Error while deleteing the item: ${error}`,
      },
      { status: 500 }
    );
  }
}
