import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password, workPlace } = await req.json();
    console.log("Name", name);
    console.log("Email", email);
    console.log("passsword", password);
    console.log("workPlace", workPlace);

    return NextResponse.json({ message: "User registered!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error occurred while registering the user" },
      { status: 500 }
    );
  }
}
