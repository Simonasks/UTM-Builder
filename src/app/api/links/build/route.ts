import { NextResponse } from "next/server";
import { buildFinalUrl } from "@/features/builder/actions/build-link";

export async function POST(request: Request) {
  const body = await request.json();
  const result = buildFinalUrl(body);
  if (!result.success) {
    return NextResponse.json({ errors: result.errors }, { status: 400 });
  }

  return NextResponse.json({ finalUrl: result.finalUrl });
}
