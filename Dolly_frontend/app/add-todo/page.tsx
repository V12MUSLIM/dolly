"use client";

import NeatBackground from "../components/neatBackground";
import useGreetings from "@/hooks/useGreetings";

import TodoTabs from "./todoTabs";
// Mock users data

export default function AddTodoPage() {
  const { greeting, randomGreetingPhrase } = useGreetings();

  return (
    <div className="relative grid  overflow-y-auto h-screen grid-rows-[1fr_auto] overflow-hidden px-2 py-4">
      <NeatBackground />

      <div className="relative z-10  flex flex-col items-center justify-center gap-2">
        <h1 className="text-center   rounded-full max-w-3xl py-2  text-2xl w-full sm:text-3xl font-semibold md:text-4xl leading-tight tracking-tight">
          {greeting}, {randomGreetingPhrase || ""}
        </h1>
        <TodoTabs />
      </div>
    </div>
  );
}
