import {
  Button,
  Description,
  Dropdown,
  Header,
  Label,
  Separator,
} from "@heroui/react";
import { EllipsisVertical, Pen, Trash } from "lucide-react";
import { TodoProps } from "./todo";
import { useTodos } from "@/store/TodosStore";

interface TodoMenuProps {
  id: TodoProps["id"];
}
export default function TodoMenu({ id }: TodoMenuProps) {
  const deleteTodo = useTodos((s) => s.deleteTodo);
  const setEditing = useTodos((s) => s.setEdit);
  return (
    <Dropdown className="">
      <Button
        isIconOnly
        aria-label="Todo options"
        variant="tertiary"
        className="ml-auto size-8 rounded-full bg-default text-accent hover:bg-default-hover sm:size-8"
      >
        <EllipsisVertical className="size-4" />
      </Button>

      <Dropdown.Popover
        placement="bottom end"
        className="w-72 rounded-[2rem] p-2 shadow-xl"
      >
        <Dropdown.Menu
          aria-label="Todo actions"
          onAction={(key) => {
            if (key === "edit") setEditing(id);
            if (key === "delete") deleteTodo(id);
          }}
        >
          <Dropdown.Section>
            <Header>Actions</Header>

            <Dropdown.Item id="edit" textValue="Edit todo">
              <Pen className="size-4 text-muted" />

              <div className="flex flex-col">
                <Label>Edit todo</Label>
                <Description>Make changes</Description>
              </div>
            </Dropdown.Item>
          </Dropdown.Section>

          <Separator />

          <Dropdown.Section>
            <Header>Danger zone</Header>

            <Dropdown.Item id="delete" textValue="Delete todo" variant="danger">
              <Trash className="size-4 text-danger" />

              <div className="flex flex-col">
                <Label>Delete todo</Label>
                <Description>Move to trash</Description>
              </div>
            </Dropdown.Item>
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
