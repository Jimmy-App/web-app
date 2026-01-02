import { NextResponse } from "next/server";

const disabledPayload = { error: "Authentication is disabled." };

export async function GET() {
  return NextResponse.json(disabledPayload, { status: 501 });
}

export async function POST() {
  return NextResponse.json(disabledPayload, { status: 501 });
}
