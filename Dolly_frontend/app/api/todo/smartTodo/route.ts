import { getTodoSystemPrompt } from "@/hooks/getTodoSystemPrompt";
import { NextRequest, NextResponse } from "next/server";
import ollama, { GenerateResponse } from "ollama";
export async function POST(req: NextRequest) {
  let userPrompt: unknown;
  let projects: unknown;

  try {
    const body = await req.json();

    userPrompt = body.prompt;
    projects = body.projects;
  } catch {
    return NextResponse.json({ error: "Invalid json" }, { status: 400 });
  }

  if (!userPrompt) {
    return NextResponse.json(
      { error: "Prompt can not be empty" },
      { status: 400 },
    );
  }
  if (typeof userPrompt != "string") {
    return NextResponse.json(
      { error: `Expected string but got ${typeof userPrompt}` },
      { status: 400 },
    );
  }
  if (!Array.isArray(projects)) {
    return NextResponse.json(
      { error: "Projects must be an array" },
      { status: 400 },
    );
  }
  let todo: unknown;
  try {
    const generateResponse: GenerateResponse = await ollama.generate({
      model: "qwen3:4b-instruct-2507-q4_K_M",
      prompt: userPrompt,
      system: getTodoSystemPrompt(projects),
      format: "json",
      options: {
        temperature: 0.0,
        top_p: 0.9,
      },
    });

    todo = await JSON.parse(generateResponse.response || "");
    return NextResponse.json({ todo });
  } catch {
    return NextResponse.json({ error: "API error" }, { status: 502 });
  }
}
