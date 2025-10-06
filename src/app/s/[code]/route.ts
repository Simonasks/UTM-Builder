import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { code: string } }
) {
  // Stub: log click and redirect to example
  console.log("click", params.code, new Date().toISOString());
  return NextResponse.redirect("https://example.com", { status: 302 });
}
