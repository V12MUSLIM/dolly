import { TODO_SYSTEM_PROMPT } from "@/app/constants/todoPrompt";
import { NextResponse, NextRequest } from "next/server";
import ollama, { GenerateResponse } from "ollama";
import { z } from "zod";
const subtaskSchema = z.object({
  id: z.string(),
  title: z.string(),
});
const todoSchema = z.object({
  title: z.string(),
  project: z
    .string()
    .nullable()
    .describe("The project can be null if the user did not provide a project"),
  subtasks: z
    .array(subtaskSchema)
    .default([])
    .describe("user subtasks is an array of strings or empty"),
  dueDate: z.iso.date().nullable(),
  isPomodoro: z.enum(["on", "off"]),
  piority: z.enum(["P1", "P2", "P3", "P4"]).nullable(),
});
export async function POST(req: NextRequest) {
  let userPrompt;
  try {
    const { prompt } = await req.json();
    userPrompt = prompt;
  } catch {
    return NextResponse.json(
      {
        error: "Invalid json",
      },
      { status: 400 },
    );
  }
  if (!userPrompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }
  if (typeof userPrompt !== "string") {
    return NextResponse.json({
      error: `Expected string but got ${typeof userPrompt}`,
    });
  }
  try {
    const res: GenerateResponse = await ollama.generate({
      model: "qwen3:4b-instruct-2507-q4_K_M",
      prompt: userPrompt,
      stream: false,
      system: TODO_SYSTEM_PROMPT,
      format: "json",
      options: {
        temperature: 0.0,
        top_p: 0.9,
      },
    });

    const parsed = JSON.parse(res.response);

    const todo = todoSchema.parse(parsed);

    return NextResponse.json(todo);
  } catch (err) {
    return NextResponse.json({ error: `API error ${err}` }, { status: 502 });
  }
}
