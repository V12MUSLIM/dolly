"use client";
import { useSmartTodo } from "@/hooks/useSmartTodo";
import { Button, Surface, TextArea, toast } from "@heroui/react";
import { Plus } from "lucide-react";
import { useState } from "react";
export default function SmartTodo() {
  const [prompt, setPrompt] = useState("");
  const createTodo = useSmartTodo();
  const handleAddTodo = async () => {
    if (!prompt.trim()) return;
    const todo = await createTodo(prompt);
    console.log(todo);
    toast.success(`Added ${todo.title}`);
    setPrompt("");
  };
  return (
    <Surface className="w-full px-2 relative rounded-3xl p-0.5 max-w-3xl overflow-visible">
      <div className="relative p-4 rounded-[22px]  w-full h-full">
        <TextArea
          className="w-full min-h-28 min-w-70 resize-none"
          placeholder="Just type in your todo."
          variant="secondary"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button
          size="lg"
          isIconOnly
          className="absolute right-5 transform -translate-x-1/2 bottom-14 translate-y-1/2"
          onClick={handleAddTodo}
        >
          <Plus />
        </Button>
      </div>
    </Surface>
  );
}
