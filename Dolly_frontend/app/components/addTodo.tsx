"use client";
import { useTodos } from "@/store/TodosStore";
import { Button, Card, ErrorMessage, Input, Label, toast } from "@heroui/react";
import { ChevronDown, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { DateValue } from "@internationalized/date";
import { useRef, useState } from "react";
import Tags from "./tags";

type SubTask = {
  id: string;
  title: string;
};
export default function AddTodo({
  filters,
  variant = "default",
}: {
  filters?: boolean;
  variant?: "transparent" | "default" | "secondary" | "tertiary";
}) {
  const [title, setTitle] = useState("");
  const [collapse, setCollapse] = useState(false);
  const [dueDate, setDueDate] = useState<DateValue | null>(null);
  const [showError, setShowError] = useState(false);
  const [subtasks, setSubtasks] = useState<SubTask[]>([]);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const addTodo = useTodos((s) => s.addTodo);
  const setFilter = useTodos((s) => s.setFilter);
  const setProjectName = useTodos((s) => s.setProjectName);
  const setPomodoro = useTodos((s) => s.setPomodoro);
  const setPrioirty = useTodos((s) => s.setPiority);
  const setDatePickerValue = useTodos((s) => s.setDatePickerValue);
  const handelAddTodo = () => {
    if (title.trim().length === 0) {
      setShowError(true);
      return;
    }
    addTodo(title, dueDate, subtasks);
    setTitle("");
    setShowError(false);
    setFilter("all");
    setProjectName(null);
    setDueDate(null);
    setPomodoro("off");
    setPrioirty(null);
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
  function addNextSubtask(
    subtask: SubTask,
    k: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (k.key !== "Enter") return;
    if (!subtask.title.trim()) return;
    k.preventDefault();
    setSubtasks((prev) => [...prev, { id: crypto.randomUUID(), title: "" }]);
    requestAnimationFrame(() => {
      inputRefs.current[inputRefs.current.length - 1]?.focus();
    });
  }
  function deleteSubtask(id: string) {
    setSubtasks((prev) => prev.filter((subtask) => subtask.id !== id));
  }
  return (
    <Card
      variant={variant}
      className="mx-auto flex w-full max-w-3xl flex-col self-center "
    >
      <Card.Header className="px-2 py-2 sm:px-3 sm:py-2">
        <Card.Title className="text-base sm:text-lg"></Card.Title>
      </Card.Header>
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
          <AnimatePresence>
            {collapse && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -8 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="flex w-full  flex-col gap-2 px-2 py-4 overflow-hidden max-h-96 overflow-y-auto"
              >
                <Label>Subtasks</Label>

                {subtasks.map((subtask, index) => {
                  return (
                    <div
                      className="flex w-full gap-2 items-center"
                      key={subtask.id}
                    >
                      <p>{index + 1}.</p>
                      <Input
                        ref={(el) => {
                          inputRefs.current[index] = el;
                        }}
                        variant="secondary"
                        value={subtask.title}
                        onChange={(e) => {
                          setSubtasks((prev) =>
                            prev.map((item) => {
                              return item.id === subtask.id
                                ? { ...item, title: e.target.value }
                                : item;
                            }),
                          );
                        }}
                        onKeyDown={(k) => addNextSubtask(subtask, k)}
                        placeholder={"Add a subttile"}
                        fullWidth
                        className={""}
                      />

                      <Button
                        onPress={() => deleteSubtask(subtask.id)}
                        variant="tertiary"
                      >
                        Delete
                      </Button>
                    </div>
                  );
                })}

                <Button
                  onPress={() => {
                    if (subtasks.length === 10) return;
                    setSubtasks((prev) => [
                      ...prev,
                      { id: crypto.randomUUID(), title: "" },
                    ]);
                  }}
                  variant="secondary"
                  fullWidth
                  className={" shrink-0"}
                  isDisabled={subtasks.length >= 10}
                >
                  Add subtask
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          <Button
            variant="ghost"
            className="self-center flex items-center gap-1 text-muted"
            onPress={() => setCollapse((prev) => !prev)}
          >
            {collapse ? "Hide subtasks" : "Add subtasks"}

            <motion.span
              animate={{ rotate: collapse ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="size-5" />
            </motion.span>
          </Button>
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

      {showError && (
        <Card.Footer className="w-full flex justify-center">
          <ErrorMessage>This field can not be empty.</ErrorMessage>
        </Card.Footer>
      )}
      {filters && (
        <Card.Footer className="px-2 pb-2 sm:px-3 sm:pb-3">
          <Tags datePickerValue={dueDate} setDatePickerValue={setDueDate} />
        </Card.Footer>
      )}
    </Card>
  );
}
