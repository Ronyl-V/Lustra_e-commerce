// app/api/subscribe/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ message: "Invalid email" }, { status: 400 });
  }

  // TODO: Save to database or mailing service
  console.log("New subscriber:", email);

  return NextResponse.json({ message: "Subscribed successfully" });
}
