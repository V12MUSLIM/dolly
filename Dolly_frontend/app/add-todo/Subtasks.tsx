import { AnimatePresence, motion } from "motion/react";
import { Button, Input, Label } from "@heroui/react";
import { ChevronDown } from "lucide-react";
import type { Subtask } from "./addTodo";
import { Dispatch, SetStateAction, useRef } from "react";
import { TodosStoreTypes } from "@/store/TodosStore";

type SubtasksProps = {
  collapse: boolean;
  setCollapse: Dispatch<SetStateAction<boolean>>;
  subtasks: Subtask[];
  setSubtasks: TodosStoreTypes["setSubtasks"];
};
export default function Subtasks({
  collapse,
  setCollapse,
  subtasks,
  setSubtasks,
}: SubtasksProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  function addNextSubtask(
    subtask: Subtask,
    k: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (k.key !== "Enter") return;
    if (!subtask.title.trim()) return;
    k.preventDefault();
    setSubtasks([...subtasks, { id: crypto.randomUUID(), title: "" }]);
    requestAnimationFrame(() => {
      inputRefs.current[inputRefs.current.length - 1]?.focus();
    });
  }
  function deleteSubtask(id: string) {
    setSubtasks(subtasks.filter((subtask) => subtask.id !== id));
  }
  return (
    <>
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
                      setSubtasks(
                        subtasks.map((item) => {
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
                setSubtasks([
                  ...subtasks,
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
    </>
  );
}
