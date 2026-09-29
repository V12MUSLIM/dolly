"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Award,
  CalendarDays,
  CheckCircle2,
  Inbox,
  KanbanSquare,
  LayoutDashboard,
  ListTodo,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Settings,
  Trash,
  type LucideIcon,
} from "lucide-react";
import { Avatar, Button, Card, ProgressBar, Tooltip } from "@heroui/react";
import { useTodos } from "@/store/TodosStore";
import Image from "next/image";
import useTodayTodos from "@/hooks/useTodayTodos";
import EmptyState from "./emptyState";
import { useTheme } from "next-themes";
import { TodoProps } from "./todo/todo";

const themeLogoImages = {
  default: "/default.png",
  ocean: "/focus.png",
  violet: "/plan.png",
  emerald: "/fresh-start.png",
  coral: "/priorities.png",
  rose: "/rose.png",
  calm: "/calm.png",

  // Dark themes
  midnight: "/focus.png",
  "dark-violet": "/plan.png",
  forest: "/fresh-start.png",
  "dark-coral": "/priorities.png",
  "dark-rose": "/rose.png",
  mono: "/calm.png",
};
type NavItem = {
  label: string;
  href: string;
  Icon: LucideIcon;
  count?: number | null;
};

type TodoSidebarProps = {
  collapsed: boolean;

  onCollapsedChange?: (collapsed: boolean) => void;
  onAddTask?: () => void;
};

function isActiveRoute(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function TodoSidebar({
  collapsed,
  onCollapsedChange,
}: TodoSidebarProps) {
  const pathname = usePathname();
  const todos = useTodos((s) => s.todos);
  const todayTodos = useTodayTodos(todos);
  const [mounted, setMounted] = React.useState(false);
  const { resolvedTheme} = useTheme();
  const completedTodayTodosLength = useTodayTodos(
    todos.filter((todo) => todo.completed),
  ).length;
  const percentage = useTodos((e) => e.CalcualteComletedPercentage(todayTodos));
  const todayTodosCount = useTodayTodos(todos).length;

  const isCollapsed = collapsed;
  const navigation: NavItem[] = [
    { label: "Inbox", href: "/", Icon: Inbox, count: todos.length },
    {
      label: "Today",
      href: "/today-todos",
      Icon: CalendarDays,
      count: todayTodosCount > 0 ? todayTodosCount : null,
    },
    { label: "Upcoming", href: "/upcoming", Icon: ListTodo },
    { label: "Completed", href: "/completed", Icon: CheckCircle2 },
    { label: "Dashboard", href: "/dashboard", Icon: LayoutDashboard },
    { label: "Kanban", href: "/kanban", Icon: KanbanSquare },
  ];
  React.useEffect(() => {
    setMounted(true);
  }, []);
  const projects = useTodos((s) => s.projects);
  const setProjectModalOpen = useTodos((s) => s.setProjectModalOpen);
  const deleteProject = useTodos((s) => s.deleteProject);

  function toggleSidebar() {
    const nextValue = !isCollapsed;
    onCollapsedChange?.(nextValue);
  }
  const logo = mounted
    ? (themeLogoImages[resolvedTheme as keyof typeof themeLogoImages] ??
      themeLogoImages.default)
    : themeLogoImages.default;
  return (
    <aside className="sticky border-r-2 border-black/10 inset-shadow-sm rounded-r-2xl top-0 hidden h-dvh w-full flex-col   bg-surface px-2 py-4 text-foreground lg:flex">
      <div
        className={`mb-8 flex items-start ${
          isCollapsed ? "justify-center" : "justify-end"
        }`}
      >
        {!isCollapsed && (
          <div className="w-full flex items-center justify-between">
            <div className="flex flex-row gap-2">
              {" "}
              <Image src={logo} width={30} height={30} alt="Dolly logo" />
              <h2 className="text-lg font-bold">Dolly</h2>
            </div>
            <Button
              isIconOnly
              aria-label="Collapse sidebar"
              className="size-8 text-muted"
              variant="tertiary"
              onPress={toggleSidebar}
            >
              <PanelLeftClose className="size-4" />
            </Button>
          </div>
        )}
      </div>

      {isCollapsed && (
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="size-9  p-2 rounded-full bg-accent-soft">
            <Image src={logo} width={40} height={40} alt="Dolly logo" />
          </div>
          <div className="flex flex-col ">
            <Button
              isIconOnly
              aria-label="Expand sidebar"
              className="mb-6 size-10 self-center text-muted"
              variant="tertiary"
              onPress={toggleSidebar}
            >
              <PanelLeftOpen className="size-4" />
            </Button>
            <Link href={"/add-todo"}>
              <Button
                size="lg"
                isIconOnly={isCollapsed}
                aria-label="Add todo"
                fullWidth
              >
                <Plus className="size-5 shrink-0" />
                {!isCollapsed && <span>Add task</span>}
              </Button>
            </Link>
          </div>
        </div>
      )}

      <nav className="mt-4" aria-label="Task navigation">
        {!isCollapsed && (
          <p className="mb-2 px-3 text-xs font-semibold tracking-wide text-muted uppercase">
            Workspace
          </p>
        )}

        <div className="space-y-1">
          {navigation.map(({ label, href, Icon, count }) => {
            const active = isActiveRoute(pathname, href);

            return (
              <Link
                key={href}
                href={href}
                title={isCollapsed ? label : undefined}
                className={[
                  "flex items-center rounded-2xl  py-3.5 text-sm font-medium transition-colors",
                  isCollapsed ? "justify-center px-2" : "gap-3 px-3",
                  active
                    ? "bg-accent-soft text-accent-soft-foreground"
                    : "text-muted hover:bg-surface-hover hover:text-foreground",
                ].join(" ")}
              >
                <Icon
                  className={`size-5 shrink-0 ${active ? "fill-accent/10" : ""}`}
                  strokeWidth={active ? 2.5 : 2}
                />
                {!isCollapsed && (
                  <span className={`flex-1 ${active ? "font-bold" : ""}`}>
                    {label}
                  </span>
                )}
                {!isCollapsed && count && (
                  <span className="text-xs font-semibold bg-accent-soft px-2 py-1 rounded-full">
                    {count}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="my-6 border-t border-border" />

      <section>
        {!isCollapsed && (
          <div className="mb-2 flex items-center justify-between ">
            <p className="text-xs font-semibold tracking-wide text-muted uppercase ml-3">
              Projects
            </p>
            <Button
              type="button"
              aria-label="Create project"
              className="text-muted transition-colors hover:text-foreground"
              variant="ghost"
              onPress={() => setProjectModalOpen(true)}
            >
              <Plus strokeWidth={3} className="size-4 text-accent" />
            </Button>
          </div>
        )}

        <div className="space-y-1">
          {projects.length > 0
            ? projects.map((project: TodoProps["project"]) => (
                <div className="flex flex-row group" key={project?.id}>
                  <Tooltip delay={0}>
                    <Tooltip.Trigger className="w-full">
                      <Link href={`/projects/${project?.id}`}>
                        <Button
                          type="button"
                          aria-label={isCollapsed ? project?.name : undefined}
                          fullWidth
                          variant={
                            pathname === `/projects/${project?.name}`
                              ? "secondary"
                              : "ghost"
                          }
                          className={`flex  ${
                            isCollapsed ? "justify-center" : "justify-between"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`size-2.5 shrink-0 rounded-full ${project?.color}`}
                            />
                            {!isCollapsed && <span>{project?.name}</span>}
                          </div>
                        </Button>
                      </Link>
                    </Tooltip.Trigger>
                    {isCollapsed && (
                      <Tooltip.Content placement="right">
                        {project?.name}
                      </Tooltip.Content>
                    )}
                  </Tooltip>
                  {!isCollapsed && (
                    <Button
                      isIconOnly
                      onClick={() => deleteProject(project.id)}
                      variant="ghost"
                      className={
                        "text-accent opacity-0 transition-opacity group-hover:opacity-100"
                      }
                    >
                      <Trash />
                    </Button>
                  )}
                </div>
              ))
            : !isCollapsed && (
                <EmptyState
                  style="section"
                  state="fullEmpty"
                  title="No projects"
                  isProject
                  message="No Projects for now. Add on by clicking one the plus icon."
                />
              )}
        </div>
      </section>

      <div className="mt-auto">
        {!isCollapsed && todayTodosCount > 0 && (
          <Card className="mb-4  bg-accent-soft p-4 text-accent-soft-foreground">
            <div className="mb-2 flex items-center gap-2">
              <Award className="size-4 fill-accent text-accent" />
              <span className="text-sm font-semibold">Daily progress</span>
            </div>

            <p className="text-sm">
              {completedTodayTodosLength} of {todayTodosCount} tasks completed
            </p>

            <ProgressBar
              aria-label={`Progress is ${percentage}%`}
              value={percentage}
            >
              <ProgressBar.Output />
              <ProgressBar.Track className="bg-white">
                <ProgressBar.Fill />
              </ProgressBar.Track>
            </ProgressBar>
          </Card>
        )}

        <Link href="/settings" title={isCollapsed ? "Settings" : undefined}>
          <Button
            variant="ghost"
            className={`flex ${isCollapsed ? "justify-center" : "justify-start"} gap-3`}
            fullWidth
            aria-label="Settings"
          >
            <Settings className="size-5" />
            {!isCollapsed && <span>Settings</span>}
          </Button>
        </Link>

        <div
          className={`mt-3 flex items-center border-t border-border py-4  ${
            isCollapsed ? "justify-center" : "gap-3 px-1"
          }`}
        >
          <Avatar className="size-9 shrink-0">
            <Avatar.Image
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ31AJgnafBIYpzoU5HsFTTn4zf4luRt2oPD4PJp_foew&s=10"
              }
            ></Avatar.Image>
            <Avatar.Fallback>AM</Avatar.Fallback>
          </Avatar>

          {!isCollapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">
                Mostafa Abo Al-Qasem
              </p>
              <p className="truncate text-xs text-muted">mostafa@me.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
