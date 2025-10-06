import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing CSV file" }, { status: 400 });
  }
  const text = await file.text();
  const lines = text.trim().split(/\r?\n/).length;
  return NextResponse.json({ dryRun: true, rows: lines - 1, violations: 0 });
}
