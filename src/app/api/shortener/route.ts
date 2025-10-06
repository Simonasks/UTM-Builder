import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  const { url } = await request.json();
  if (!url) {
    return NextResponse.json({ error: "Missing URL" }, { status: 400 });
  }
  const shortCode = crypto.randomBytes(3).toString("hex");
  return NextResponse.json({ shortCode, target: url });
}
