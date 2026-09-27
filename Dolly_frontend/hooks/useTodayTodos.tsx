import { TodoProps } from "@/app/components/todo/todo";
import { useMemo } from "react";

export default function useTodayTodos(todos: TodoProps[]) {
  const todayTodos = useMemo(() => {
    const today = new Date().toDateString();

    return todos.filter((todo) => {
      if (!todo.dueDate) return false;

      return new Date(todo.dueDate).toDateString() === today;
    });
  }, [todos]);
  return todayTodos;
}
