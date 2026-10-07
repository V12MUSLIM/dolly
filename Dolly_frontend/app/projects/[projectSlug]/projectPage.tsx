"use client";

import TodosDisplay from "@/app/components/todosDisplay";
import { useTodos } from "@/store/TodosStore";

export default function ProjectPage({ projectSlug }: { projectSlug: string }) {
  const todos = useTodos((s) => s.todos);
  const hasHydrated = useTodos((s) => s.hasHydrated);
  const projects = useTodos((s) => s.projects);
  
  const currentProject = projects.find(
    (project) => project?.slug === projectSlug,
  );
  const projectTodos = todos.filter(
    (todo) => todo.project?.slug === projectSlug,
  );

  return (
    <TodosDisplay
      todos={projectTodos}
      title={currentProject?.name}
      emptyMessage={`No todos in ${currentProject?.name} yet`}
      isLoading={!hasHydrated}
      className="min-h-screen"
    />
  );
}
