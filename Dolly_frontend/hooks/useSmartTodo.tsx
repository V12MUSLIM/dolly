export function useSmartTodo() {
  const createTodo = async (prompt: string) => {
    try {
      const res = await fetch("/api/todo/smartTodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to create todo");
      }
      const  response  = await res.json();
      return response;
    } catch (err) {
      console.log("Error", err);
    }
  };
  return createTodo;
}
