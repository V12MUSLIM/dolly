import { todos } from "../route";
type PatchBody = {
  completed: boolean;
};
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  return Response.json({ todo });
}
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    return Response.json({ error: "Not Found" }, { status: 404 });
  }
  const todo = todos[todoIndex];
  todos.splice(todoIndex, 1);
  return Response.json(
    { success: `Deleted  ${todo.title} successfully` },
    { status: 200 },
  );
}
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  let completed;
  const { id } = await params;
  try {
    const data: PatchBody = await request.json();
    completed = data.completed;
  } catch {
    return Response.json(
      { error: "Invalid or missing JSON body" },
      { status: 400 },
    );
  }
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex === -1) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  if (typeof completed != "boolean") {
    return Response.json(
      { error: `Expected Boolean but got ${typeof completed}` },
      { status: 400 },
    );
  }

  todos[todoIndex].completed = completed;
  return Response.json({ success: "Todo completed changed" }, { status: 200 });
}
