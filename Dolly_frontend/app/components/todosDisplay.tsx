import { Card } from "@heroui/react";
import { TodoProps } from "./todo/todo";
import Filters from "./filters";
import AddTodo from "./addTodo";

import AnimatedList from "./AnimatedList";
import { Calendar } from "lucide-react";
import formatDate from "@/utils/formatDate";
import EmptyState from "./emptyState";
interface TodosDisplayProps {
  className?: "" | string;
  todos: TodoProps[];
  title?: string;
  emptyMessage?: string;
  isLoading?: boolean;
  quickAdd?: boolean;
}
export default function TodosDisplay({
  className,
  todos,
  title,
  emptyMessage,
  isLoading = false,
  quickAdd = false,
}: TodosDisplayProps) {
  const today = formatDate(new Date(), "full");
  console.log(todos)
  return (
    <Card
      className={`flex w-full border-0 shadow-none   min-h-0  h-full flex-col  px-2 py-4 overflow-hidden ${className ?? ""}`}
    >
      {quickAdd && <AddTodo />}

      <Card.Header className="mb-2 mt-2 px-2 sm:mb-3 sm:mt-3 sm:px-3 space-y-4">
        <Card.Title className="text-2xl sm:text-3xl ">
          {title ? title : "Your Todos"}
        </Card.Title>
        <p className="flex flex-row text-sm gap-1">
          <Calendar className="size-5 text-muted " />
          {today}
        </p>
      </Card.Header>
      <Filters />
      <Card.Content className="flex min-h-0 flex-1 flex-col overflow-hidden gap-2 px-1 sm:gap-3 sm:px-2">
        {isLoading ? (
          <div className="flex min-h-112 items-center justify-center rounded-2xl border border-dashed border-border text-muted">
            Loading your tasks…
          </div>
        ) : todos.length > 0 ? (
          <AnimatedList
            todos={todos}
            showGradients={false}
            displayScrollbar={true}
          />
        ) : (
          <EmptyState message={emptyMessage} style="page" state="fullEmpty" isButton />
        )}
      </Card.Content>
    </Card>
  );
}
