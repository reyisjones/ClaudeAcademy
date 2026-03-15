import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8000";

export async function POST(request: Request) {
  const body = await request.json();
  const { code, language } = body as { code: string; language: string };

  if (!code || typeof code !== "string") {
    return NextResponse.json({ error: "Invalid code" }, { status: 400 });
  }

  if (!["python", "javascript", "typescript"].includes(language)) {
    return NextResponse.json({ error: "Unsupported language" }, { status: 400 });
  }

  // Cap code size to prevent abuse
  if (code.length > 10_000) {
    return NextResponse.json({ error: "Code too large" }, { status: 400 });
  }

  const res = await fetch(`${BACKEND_URL}/api/v1/playground/run`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, language }),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Execution failed" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
