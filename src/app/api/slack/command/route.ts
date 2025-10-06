import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.formData();
  const text = body.get("text")?.toString() ?? "";
  if (!text) {
    return new Response("Usage: /utm create <url>", { status: 200 });
  }
  return NextResponse.json({
    response_type: "ephemeral",
    text: `Created short link for ${text} (stub)`
  });
}
