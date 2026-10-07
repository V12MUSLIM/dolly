import { NextRequest } from "next/server";
import { todos } from "../route";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const q = searchParams.get("q");
  if (q) {
    const searchResults = todos.filter((todo) =>
      todo.title.toLowerCase().includes(q.toLowerCase()),
    );

    return Response.json({ searchResults });
  }
  return Response.json({ error: "missing query param" }, { status: 400 });
}
