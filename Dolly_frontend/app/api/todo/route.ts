import { NextRequest } from "next/server";
export const todos = [
  { id: "101", title: "Buy groceries", completed: false },
  { id: "102", title: "Call mom", completed: true },
  { id: "103", title: "Read a book", completed: false },
  { id: "104", title: "Submit project", completed: true },
  { id: "105", title: "Go for a walk", completed: false },
  { id: "106", title: "Email team", completed: true },
  { id: "107", title: "Clean room", completed: false },
  { id: "108", title: "Water plants", completed: true },
  { id: "109", title: "Watch movie", completed: false },
  { id: "110", title: "Schedule meeting", completed: true },
  { id: "111", title: "Cook dinner", completed: false },
  { id: "112", title: "Do laundry", completed: true },
  { id: "113", title: "Call doctor", completed: false },
  { id: "114", title: "Finish report", completed: true },
  { id: "115", title: "Practice guitar", completed: false },
];

interface CreateTodoBody {
  title: string;
}
export async function POST(request: NextRequest) {
  let todo: CreateTodoBody;
  try {
    todo = await request.json();
  } catch {
    return Response.json(
      { error: "Invalid or missing JSON body" },
      { status: 400 },
    );
  }
  if (!todo.title) {
    return Response.json({ error: "Title is missing" }, { status: 400 });
  }
  if (typeof todo.title != "string") {
    return Response.json(
      { error: `Expected string but got ${typeof todo.title}` },
      { status: 400 },
    );
  }

  todos.push({ title: todo.title, id: crypto.randomUUID(), completed: false });
  return Response.json({ success: `Added ${todo.title}` }, { status: 201 });
}

export async function GET() {
  return Response.json(todos);
}
