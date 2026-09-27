"use client";
import { useTodos } from "@/store/TodosStore";
import TodosDisplay from "../components/todosDisplay";
import useTodayTodos from "@/hooks/useTodayTodos";
import CompletedTodos from "../components/completed";
import QuickActions from "../components/quickActions";
import DailyQuoteCard from "../components/dailyQuoteCard";
import DailyStreak from "../components/dailyStreak";


export default function TodayTodos() {
  const todos = useTodos((s) => s.todos);
  const todayTodos = useTodayTodos(todos);
  return (
   <div className="grid h-full min-h-0 p-2 overflow-hidden bg-(--app-surface) grid-cols-1  lg:grid-cols-[minmax(0,1fr)_20rem]">
      <TodosDisplay todos={todayTodos} title="Today's Todos"/>
        <aside className="min-h-0 hidden lg:flex overflow-y-auto  flex-col gap-4 px-2 mt-4">
        <CompletedTodos todos={todayTodos} title="Today" />
        <QuickActions />
        <DailyQuoteCard />
        <DailyStreak/>
      </aside>
    </div>
  );
}
