"use client";
import { useSmartTodo } from "@/hooks/useSmartTodo";
import { useTodos } from "@/store/TodosStore";
import { Button, Spinner, Surface, TextArea, toast } from "@heroui/react";
import { Loader, Plus } from "lucide-react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

const MIN_HEIGHT = 112;
const MAX_HEIGHT = 288;

export default function SmartTodo() {
  const [prompt, setPrompt] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const creatTodo = useTodos((s) => s.creatTodo);
  const { makeTodo, isLoading, error } = useSmartTodo();

  const resize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const border = el.offsetHeight - el.clientHeight;
    const content = el.scrollHeight + border;
    el.style.height = `${Math.min(Math.max(content, MIN_HEIGHT), MAX_HEIGHT)}px`;
    el.style.overflowY = content > MAX_HEIGHT ? "auto" : "hidden";
  }, []);

  useLayoutEffect(() => {
    resize();
  }, [prompt, resize]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    let lastWidth = el.clientWidth;
    const observer = new ResizeObserver(() => {
      if (el.clientWidth !== lastWidth) {
        lastWidth = el.clientWidth;
        resize();
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [resize]);

  const handleAddTodo = async () => {
    if (!prompt.trim() || isLoading) return;

    console.log("Hydration complete:", useTodos.persist.hasHydrated());

    console.log("Projects:", useTodos.getState().projects);

    console.log("Projects count:", useTodos.getState().projects.length);

    try {
      const todo = await makeTodo(prompt);

      creatTodo(todo);
      toast.success(`Added ${todo.title}`);
      setPrompt("");
      textareaRef.current?.focus();
    } catch (err) {
      console.error("Failed to create todo:", err);
      console.log("Smart todo error:", error);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Enter") return;
    if (e.nativeEvent.isComposing) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const forceSubmit = e.metaKey || e.ctrlKey;

    if (!forceSubmit && (e.shiftKey || isTouch)) return;

    e.preventDefault();
    void handleAddTodo();
  };

  return (
    <Surface className="w-full max-w-3xl rounded-3xl p-0.5 overflow-visible">
      <div className="relative w-full rounded-[22px] p-4">
        <TextArea
          ref={textareaRef}
          rows={1}
          aria-label="New todo"
          className="block w-full min-h-28 resize-none pr-16 pb-14 text-lg"
          placeholder="Just type in your todo."
          variant="secondary"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          size="lg"
          isIconOnly
          aria-label="Add todo"
          className="absolute bottom-6 right-6"
          onPress={handleAddTodo}
          isDisabled={prompt.trim().length === 0 || isLoading}
        >
          {isLoading ? <Spinner color="current" size="sm" /> : <Plus />}
        </Button>
      </div>
    </Surface>
  );
}
