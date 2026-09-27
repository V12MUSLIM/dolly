"use client";
import { Card, CardHeader, Label, ProgressBar } from "@heroui/react";
import { useTodos } from "@/store/TodosStore";
import { AnimatedCircularProgressBar } from "./animated-circular-progress-bar";
import { TodoProps } from "./todo/todo";

interface CompletedTodosProps {
  className?: "" | string;
  todos: TodoProps[];
  title?: string;
}
function DesktopCompletedCard({
  percentage,
  title,
  completedTodos,
  todos,
  uncompletedTodos,
  missedLength,
}: {
  percentage: number;
  title?: string;
  completedTodos: TodoProps[];
  todos: TodoProps[];
  uncompletedTodos: number;
  missedLength: number;
}) {
  return (
    <Card className="hidden md:flex" variant="secondary">
      <CardHeader>
        <Card.Title className="text-lg">
          Overview&nbsp;{title && `-${title}`}
        </Card.Title>
      </CardHeader>
      <div className="flex flex-row md:flex-col md:gap-2">
        <Card.Content className="flex items-center">
          <AnimatedCircularProgressBar
            value={percentage}
            gaugePrimaryColor="var(--accent)"
            gaugeSecondaryColor="var(--accent-soft)"
          />
        </Card.Content>
        <Card.Footer className="flex flex-col  w-full items-center gap-6">
          <div className="flex flex-col items-center  gap-1">
            <p className="text-3xl font-semibold text-accent">{todos.length}</p>
            <Label>Total</Label>
          </div>

          <div className="grid w-full grid-cols-3">
            <div className="flex flex-col items-center">
              <p className="text-lg font-semibold text-success">
                {completedTodos.length}
              </p>
              <Label>Completed</Label>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-lg font-semibold">{uncompletedTodos}</p>
              <Label>Remaining</Label>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-lg font-semibold text-danger">
                {missedLength}
              </p>
              <Label>Missed</Label>
            </div>
          </div>
        </Card.Footer>
      </div>
    </Card>
  );
}
function MobileCompletedCard({
  percentage,
  title,
  completedTodos,
  todos,
  uncompletedTodos,
  missedLength,
}: {
  percentage: number;
  title?: string;
  completedTodos: TodoProps[];
  todos: TodoProps[];
  uncompletedTodos: number;
  missedLength: number;
}) {
  return (
    <Card className="md:hidden" variant="secondary">
      <Card.Header className="flex flex-row justify-between">
        <Card.Title>Overview&nbsp;{title && `-${title}`}</Card.Title>
        <div className="flex gap-2">
          <p className="font-semibold">Total</p>
          <p className="font-semibold text-accent"> {todos.length}</p>
        </div>
      </Card.Header>
      <Card.Content className="space-y-2">
        <ProgressBar
          aria-label={`Progress is ${percentage}%`}
          value={percentage}
        >
          <ProgressBar.Output />
          <ProgressBar.Track>
            <ProgressBar.Fill />
          </ProgressBar.Track>
        </ProgressBar>

        <div className="flex flex-row justify-around">
          <div className="flex gap-2">
            <p className="font-semibold">Completed</p>
            <p className="text-success font-semibold">
              {completedTodos.length}
            </p>
          </div>
          <div className="flex gap-2">
            <p className="font-semibold">Remaining</p>
            <p className="font-semibold text">{uncompletedTodos}</p>
          </div>
          <div className="flex gap-2">
            <p className="font-semibold ">Missed</p>
            <p className="font-semibold text-danger">{missedLength}</p>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}
export default function CompletedTodos({ todos, title }: CompletedTodosProps) {
  const completedTodos = todos.filter((todo) => todo.completed);
  const uncompletedTodos = todos.length - completedTodos.length;
  const percentage = useTodos((s) => s.CalcualteComletedPercentage(todos));
  const missedLength = useTodos((s) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    return s.todos.filter(
      (todo) =>
        todo.dueDate &&
        !todo.completed &&
        now.getTime() > new Date(todo.dueDate).setHours(0, 0, 0, 0),
    ).length;
  });
  return (
    <>
      <DesktopCompletedCard
        completedTodos={completedTodos}
        uncompletedTodos={uncompletedTodos}
        percentage={percentage}
        missedLength={missedLength}
        todos={todos}
        title={title}
      />
      <MobileCompletedCard
        completedTodos={completedTodos}
        uncompletedTodos={uncompletedTodos}
        percentage={percentage}
        missedLength={missedLength}
        todos={todos}
        title={title}
      />
    </>
  );
}
