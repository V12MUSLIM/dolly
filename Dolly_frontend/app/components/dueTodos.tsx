import { useTodos } from "@/store/TodosStore";
import { Card} from "@heroui/react";
import StatusChip from "./statusChip";
import useDueDate from "@/hooks/useDueDate";
import EmptyState from "./emptyState";
import { TodoProps } from "./todo/todo";
import { useMemo } from "react";
interface DueTodosProps {
  className?: string;
}

const DueChip = ({ todo }: { todo: TodoProps }) => {
  const { isMissed, label } = useDueDate(todo.dueDate);
  return (
    <StatusChip variant={isMissed ? "danger" : "default"}>
      {isMissed ? "" : " Due"} {label}
    </StatusChip>
  );
};

export default function DueTodos({ className = "" }: DueTodosProps) {
  const todos = useTodos((s) => s.todos);
  const dueTodos = useMemo(() => {
    return todos.filter((todo) => todo.dueDate && !todo.completed);
  }, [todos]);

  return (
    <Card variant="secondary" className={className}>
      <Card.Header>
        <Card.Title className="text-xl">Todos&apos;s Status</Card.Title>
      </Card.Header>
      <Card.Content>
        {dueTodos.length > 0 ? (
          dueTodos.map((todo) => {
            return (
              <div
                key={todo.id}
                className="grid grid-cols-[1fr_1fr_1fr] w-full items-center mt-2"
              >
                <div className="min-w-0">
                  <p className="font-medium truncate ">{todo.title}</p>
                </div>
                <div className="min-w-0 overflow-hidden flex justify-center">
                  <DueChip todo={todo} />
                </div>
                <div className="min-w-0 overflow-hidden text-right">
                  <p className="text-danger font-semibold">
                    {todo.completed ? "completed" : "Uncompleted"}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <EmptyState
            style="section"
            state="fullEmpty"
            variant="secondary"
            message="No due todos."
          />
        )}
      </Card.Content>
    </Card>
  );
}
