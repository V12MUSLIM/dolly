import { useTodos } from "@/store/TodosStore";
import { Button, Input } from "@heroui/react";
import { Check, X } from "lucide-react";
import { useRef, useState } from "react";
import { TodoProps } from "./todo";
interface TodoEditProps {
  title: string;
  id: TodoProps["id"];
}

export default function TodoEdit({ title, id }: TodoEditProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [newTitle, setNewTitle] = useState(title);
  const editTodo = useTodos((s) => s.editTodo);

  const setEditing = useTodos((s) => s.setEdit);
  const handleSave = () => {
    if (!newTitle.trim()) return;
    editTodo(newTitle.trim(), id);
    setEditing(null);
  };
  const handleCancel = () => {
    setNewTitle(title);
    setEditing(null);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };
  return (
    <div className="w-full flex gap-2">
      <Input
        ref={inputRef}
        autoFocus
        variant="secondary"
        fullWidth
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Edit todo title"
      />

      <div className="flex shrink-0 gap-1">
        <Button
          onPress={handleSave}
          isIconOnly
          size="sm"
          aria-label="Save title"
        >
          <Check className="size-4" />
        </Button>

        <Button
          variant="danger"
          onPress={handleCancel}
          isIconOnly
          size="sm"
          aria-label="Cancel editing"
        >
          <X className="size-4" />
        </Button>
      </div>
    </div>
  );
}
