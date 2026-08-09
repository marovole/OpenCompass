import { NextResponse } from "next/server";
import { orchestrateAsk } from "@/lib/orchestrator";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { question?: string };
    const question = body.question?.trim() ?? "";
    if (!question) {
      return NextResponse.json(
        { ok: false, error: "请输入问题" },
        { status: 400 },
      );
    }
    const result = await orchestrateAsk(question);
    return NextResponse.json(result);
  } catch (e) {
    const message = e instanceof Error ? e.message : "服务错误";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
