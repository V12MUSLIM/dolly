import { useTodos } from "@/store/TodosStore";
import { useState } from "react";

export function useSmartTodo() {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setLoading] = useState(false);

  const makeTodo = async (prompt: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/todo/smartTodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          projects: useTodos.getState().projects,
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to create todo Staus Code:${res.status}`);
      }

      const response = await res.json();
      return response.todo;
    } catch (err) {
      console.error("Error creating todo:", err);
      const normalizedError =
        err instanceof Error ? err : new Error("An unknown error occurred");

      setError(normalizedError);

      throw normalizedError;
    } finally {
      setLoading(false);
    }
  };

  return { makeTodo, error, isLoading };
}
