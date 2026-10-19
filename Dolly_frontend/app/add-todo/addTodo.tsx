"use client";
import { useTodos } from "@/store/TodosStore";
import { Button, Card, ErrorMessage, Input, toast } from "@heroui/react";
import { Plus } from "lucide-react";

import type { DateValue } from "@internationalized/date";
import { useState } from "react";
import Tags from "../components/tags";
import Subtasks from "./Subtasks";
import { TodoProps } from "../components/todo/todo";

export type Subtask = {
  id: string;
  title: string;
};
export default function AddTodo({
  filters,
  variant = "default",
  subtask,
}: {
  filters?: boolean;
  variant?: "transparent" | "default" | "secondary" | "tertiary";
  subtask?: boolean;
}) {
  const [collapse, setCollapse] = useState(false);
  const [title, setTitle] = useState("");
  const [showError, setShowError] = useState(false);
  const [dueDate, setDueDate] = useState<DateValue | null>(null);
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [pomodoro, setPomodoro] = useState<"on" | "off">("off");
  const [projectName, setProjectName] = useState<TodoProps["project"] | null>(
    null,
  );
  const [priority, setPriority] = useState<TodoProps["piority"]>(null);
  const creatTodo = useTodos((s) => s.creatTodo);
  const setFilter = useTodos((s) => s.setFilter);
  const setDatePickerValue = useTodos((s) => s.setDatePickerValue);
  const todo = {
    title: title,
    dueDate: dueDate?.toString() ?? null,
    subtasks: subtasks,
    isPomodoro: pomodoro,
    project: projectName,
    piority: priority,
  };
  const handelAddTodo = () => {
    if (title.trim().length === 0) {
      setShowError(true);
      return;
    }
    creatTodo(todo);
    setTitle("");
    setShowError(false);
    setFilter("all");
    setProjectName(null);
    setDueDate(null);
    setPomodoro("off");
    setPriority(null);
    setDatePickerValue(null);
    setSubtasks([]);
    setCollapse(false);
    toast.success(`Added ${title} to todos`);
  };
  const handleKeyEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handelAddTodo();
    }
  };

  return (
    <Card
      variant={variant}
      className="mx-auto flex w-full max-w-3xl flex-col self-center "
    >
      <Card.Header className="px-2 py-2 sm:px-3 sm:py-2">
        <Card.Title className="text-base sm:text-lg"></Card.Title>
      </Card.Header>
      {showError && (
        <div className="w-full flex justify-center">
          <ErrorMessage>This field can not be empty.</ErrorMessage>
        </div>
      )}
      <Card.Content className="flex flex-row items-start gap-2 px-2 pb-2 sm:px-3 sm:pb-3">
        <div className="w-full flex flex-col gap-2">
          <Input
            fullWidth
            placeholder="What should be done?"
            variant={variant === "default" ? "secondary" : "primary"}
            value={title}
            onChange={(e) => {
              setShowError(false);
              setTitle(e.target.value);
            }}
            required
            name="todoTitle"
            onKeyDown={handleKeyEnter}
          />
          {subtask && (
            <Subtasks
              collapse={collapse}
              setCollapse={setCollapse}
              setSubtasks={setSubtasks}
              subtasks={subtasks}
            />
          )}
        </div>
        <Button
          onClick={handelAddTodo}
          variant="primary"
          isIconOnly
          className="size-9 shrink-0"
        >
          <Plus className="size-4" strokeWidth={2} />
        </Button>
      </Card.Content>

      {filters && (
        <Card.Footer className="px-2 pb-2 sm:px-3 sm:pb-3">
          <Tags
            projectName={projectName}
            priority={priority}
            setPriority={setPriority}
            setProjectName={setProjectName}
            pomodoro={pomodoro}
            setPomodoro={setPomodoro}
            datePickerValue={dueDate}
            setDatePickerValue={setDueDate}
          />
        </Card.Footer>
      )}
    </Card>
  );
}
