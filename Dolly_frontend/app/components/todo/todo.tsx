"use client";

import { Button, Card, Checkbox, Tooltip } from "@heroui/react";
import {
  Calendar,
  ChevronDown,
  Clock3,
  FolderKanban,
  X,
} from "lucide-react";
import { useTodos } from "@/store/TodosStore";
import StatusChip from "../statusChip";
import TodoEdit from "./TodoEdit";
import TodoMenu from "./TodoMenu";
import usePomodoro from "@/hooks/usePomodoro";
import useRelativeTime from "@/hooks/useRelativeTime";
import useDueDate from "@/hooks/useDueDate";
import formatDate from "@/utils/formatDate";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
interface Project {
  id: string;
  name: string;
  color: string;
}
type SubTask = {
  id: string;
  title: string;
};
export interface TodoProps {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;

  project: Project | null;
  subtasks: SubTask[];
  dueDate: string | null;
  isPomodoro: "on" | "off";
  piority: "P1" | "P2" | "P3" | "P4" | null;
}

export default function Todo({
  id,
  title,
  completed,
  createdAt,
  isPomodoro,
  project,
  dueDate,
  piority,
  subtasks,
}: TodoProps) {
  const completeTodo = useTodos((s) => s.completeTodo);

  const edit = useTodos((s) => s.edit);
  const [collapse, setCollapse] = useState(false);
  const { timer, minutes, seconds } = usePomodoro(createdAt);
  const { timeLabel } = useRelativeTime(createdAt);
  const isEditing = edit === id;
  const { label, isMissed, dayDif } = useDueDate(dueDate);
  const formattedDate = formatDate(createdAt, "medium");
  const piorityColors = {
    P1: "danger",
    P2: "warning",
    P3: "success",
    P4: "default",
  };

  return (
    <Card
      className={`w-full truncate border transition-colors duration-200 hover:border-accent/50 hover:bg-accent-soft-hover/5  ${isMissed ? "bg-danger-soft" : ""} `}
      dir="auto"
    >
      <Card.Content className="flex min-h-0 flex-row items-center justify-between gap-2 px-3 py-2">
        {isEditing ? (
          <TodoEdit title={title} id={id} />
        ) : (
          <>
            <div className="flex min-w-0 flex-1 items-center gap-2">
              {isMissed ? (
                <X className="size-5 text-danger" />
              ) : (
                <Checkbox
                  isSelected={completed}
                  onChange={() => completeTodo(id)}
                  aria-label={
                    completed
                      ? `Mark "${title}" as incomplete`
                      : `Mark "${title}" as complete`
                  }
                  variant="secondary"
                >
                  <Checkbox.Content>
                    <Checkbox.Control className="size-6">
                      <Checkbox.Indicator />
                    </Checkbox.Control>
                  </Checkbox.Content>
                </Checkbox>
              )}
              <div className="min-w-0 flex-1  text-start">
                <Tooltip delay={0}>
                  <Tooltip.Trigger className="block min-w-0">
                    <p
                      className={`truncate text-sm  font-semibold leading-4 sm:text-[0.9375rem] ${
                        completed
                          ? "text-muted line-through"
                          : "text-foreground"
                      }`}
                    >
                      {title}
                    </p>
                  </Tooltip.Trigger>

                  <Tooltip.Content showArrow>
                    <Tooltip.Arrow />
                    <p className="max-w-72 wrap-break-words">{title}</p>
                  </Tooltip.Content>
                </Tooltip>

                <div className="mt-0.5  items-center gap-x-2 text-[11px] leading-4 text-muted flex">
                  <span className="flex items-center gap-1 whitespace-nowrap">
                    <Calendar className="size-3" aria-hidden="true" />
                    Created {formattedDate}
                  </span>
                  <span className="flex items-center gap-1 whitespace-nowrap">
                    <Clock3 className="size-3" aria-hidden="true" />
                    {timeLabel}
                  </span>
                  {project ? (
                    <span
                      className={`${project.color} flex items-center gap-1 rounded-full px-1.5 font-medium text-white`}
                    >
                      <FolderKanban className="size-3" aria-hidden="true" />
                      {project.name}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="flex gap-2 shrink-0 items-center">
              {isMissed ? (
                <StatusChip variant="danger">{label}</StatusChip>
              ) : null}
              {isMissed || !dueDate ? null : (
                <StatusChip
                  variant={
                    dayDif !== undefined && dayDif < 3 ? "warning" : "default"
                  }
                >
                  Due {label}
                </StatusChip>
              )}
              {isPomodoro == "on" && (
                <StatusChip variant="success">
                  {timer === 0
                    ? "Take a Rest!"
                    : `Time Left ${minutes}:${seconds}`}
                </StatusChip>
              )}

              <TodoMenu id={id} />
            </div>
          </>
        )}
      </Card.Content>

      {subtasks?.length > 0 && (
        <>
          <AnimatePresence>
            {collapse &&
              subtasks.map((subtask, index) => (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -8 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  key={subtask.id}
                  className="flex fle-row items-center gap-2"
                >
                  <span>{index + 1}.</span>
                  <Card variant="tertiary" className="w-full">
                    <Card.Header>
                      <Card.Title aria-label={subtask.title}>
                        {subtask.title}
                      </Card.Title>
                    </Card.Header>
                  </Card>
                </motion.div>
              ))}
          </AnimatePresence>
          <Button
            variant="ghost"
            className="self-center flex items-center gap-1 text-muted"
            onPress={() => setCollapse((prev) => !prev)}
          >
            {collapse ? "Hide subtasks" : "Show subtasks"}

            <motion.span
              animate={{ rotate: collapse ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              aria-label={collapse ? "Hide subtasks" : "Show subtasks"}
            >
              <ChevronDown className="size-5" />
            </motion.span>
          </Button>
        </>
      )}
    </Card>
  );
}
