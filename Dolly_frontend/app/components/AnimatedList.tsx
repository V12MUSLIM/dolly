import { useMemo, useRef, useState, type UIEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import Todo, { TodoProps } from "./todo/todo";
import { useTodos } from "@/store/TodosStore";
import EmptyPage from "./emptyState";
import EmptyState from "./emptyState";

interface AnimatedListProps {
  todos?: TodoProps[];
  showGradients?: boolean;
  className?: string;
  displayScrollbar?: boolean;
}

const itemTransition = {
  duration: 0.16,
  ease: [0.22, 1, 0.36, 1] as const,
};

export default function AnimatedList({
  todos = [],
  showGradients = true,
  className = "",
}: AnimatedListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const [topGradientOpacity, setTopGradientOpacity] = useState(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);
  const filter = useTodos((s) => s.filter);
  const visibleTodos = useMemo(
    () =>
      todos.filter(
        (todo) =>
          filter === "all" ||
          (filter === "completed" && todo.completed) ||
          (filter === "uncompleted" && !todo.completed),
      ),
    [filter, todos],
  );

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } =
      event.target as HTMLDivElement;

    setTopGradientOpacity(Math.min(scrollTop / 50, 1));

    const bottomDistance = scrollHeight - (scrollTop + clientHeight);

    setBottomGradientOpacity(
      scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1),
    );
  };

  const paritialEmptyTodos = todos.length > 0 && todos.length <= 15;
  return (
    <div className={`relative h-full min-h-0 w-full ${className}`}>
      <div
        ref={listRef}
        onScroll={handleScroll}
        className="h-full min-h-0 w-full overflow-y-auto px-0.5 py-1 sm:px-1 rounded-2xl"
        style={{
          scrollbarColor: "var(--accent) var(--accent-soft)",
          scrollbarWidth: "thin",
        }}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {visibleTodos.map((todo) => (
            <motion.div
              key={todo.id}
              layout="position"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                x: 20,
                scale: 0.98,
              }}
              transition={itemTransition}
              className="mb-1.5"
            >
              <Todo
                id={todo.id}
                title={todo.title}
                completed={todo.completed}
                createdAt={todo.createdAt}
                project={todo.project}
                dueDate={todo.dueDate}
                isPomodoro={todo.isPomodoro}
                piority={todo.piority}
                subtasks={todo.subtasks}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {visibleTodos.length > 0 && paritialEmptyTodos && (
          <EmptyPage
            style="section"
            state="partialEmpty"
            title="Nothing more"
            message="You are off to a great start keep adding todos!"
          />
        )}

        {visibleTodos.length === 0 && (
          <EmptyState
            state="fullEmpty"
            style="section"
            title={`No ${filter} todos`}
          />
        )}
      </div>

      {showGradients && (
        <>
          <div
            className="pointer-events-none absolute top-0 right-0 left-0 h-12 bg-gradient-to-b from-[var(--background)] to-transparent transition-opacity"
            style={{ opacity: topGradientOpacity }}
          />
          <div
            className="pointer-events-none absolute right-0 bottom-0 left-0 h-20 bg-gradient-to-t from-[var(--background)] to-transparent transition-opacity"
            style={{ opacity: bottomGradientOpacity }}
          />
        </>
      )}
    </div>
  );
}
