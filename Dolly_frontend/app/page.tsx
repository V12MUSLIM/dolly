"use client";
import CompletedTodos from "./components/completed";
import TodosDisplay from "./components/todosDisplay";
import QuickActions from "./components/quickActions";
import { useTodos } from "@/store/TodosStore";
import DueTodos from "./components/dueTodos";
import QuickAdd from "./components/quickAdd";

export default function Home() {
  const todos = useTodos((s) => s.todos);
  const hasHydrated = useTodos((s) => s.hasHydrated);

  return (
    <div className="grid h-full min-h-0 p-2 overflow-hidden bg-(--app-surface) grid-cols-1  lg:grid-cols-[minmax(0,1fr)_20rem]">
      <TodosDisplay todos={todos} isLoading={!hasHydrated} />

      <aside className="min-h-0 overflow-y-auto lg:flex flex-col gap-4 px-2 mt-4 hidden">
        <CompletedTodos todos={todos} />
        <QuickAdd />
        <QuickActions />

        <DueTodos />
      </aside>
    </div>
  );
}
