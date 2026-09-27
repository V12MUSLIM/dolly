"use client";

import NeatBackground from "../components/neatBackground";
import useGreetings from "@/hooks/useGreetings";
import SmartTodo from "./SmartTodo";
import { Card } from "@heroui/react";

export default function AddTodoPage() {
  const { greeting, randomGreetingPhrase } = useGreetings();

  return (
    <div className="relative grid  overflow-y-auto h-screen grid-rows-[1fr_auto] overflow-hidden px-2 py-4">
      <NeatBackground />

      <div className="relative z-10  flex flex-col items-center justify-center gap-2">
        <h1 className="text-center   rounded-full max-w-3xl py-2  text-2xl w-full sm:text-3xl font-semibold md:text-4xl leading-tight tracking-tight">
          {greeting}, {randomGreetingPhrase || ""}
        </h1>
        <SmartTodo />
        <Card variant="tertiary" className="w-full max-w-3xl h-64">
          <Card.Content className="py-4 px-2">
            <div className="flex items-center">
              <div className="w-full flex items-center gap-2">
                <div className=" bg-accent/30 flex-1 h-8 rounded-2xl overflow-hidden">
                  <div className=" inset-0 w-full h-full bg-accent/60 animate-pulse rounded-2xl" />
                </div>
                <div className="bg-accent/30 w-10 h-10 rounded-full">
                  <div className=" inset-0 w-full h-full bg-accent/60 animate-pulse rounded-full" />
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}
