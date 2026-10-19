import { TodoProps } from "@/app/components/todo/todo";
import { create } from "zustand";
import { persist } from "zustand/middleware";
export interface Project {
  id: string;
  name: string;
  slug: string;
  color: string;
}
type AddTodoType = Pick<
  TodoProps,
  "dueDate" | "isPomodoro" | "title" | "subtasks" | "project" | "piority"
>;
export interface TodosStoreTypes {
  todos: TodoProps[];
  completeTodo: (id: TodoProps["id"]) => void;
  deleteTodo: (id: TodoProps["id"]) => void;
  filter: "all" | "completed" | "uncompleted";
  setFilter: (filter: TodosStoreTypes["filter"]) => void;
  edit: string | null;
  setEdit: (id: TodoProps["id"] | null) => void;
  editTodo: (newtitle: string, id: TodoProps["id"]) => void;
  markAllCompleted: () => void;
  markAllUncompleted: () => void;
  deleteAll: () => void;
  CalcualteComletedPercentage: (todos: TodosStoreTypes["todos"]) => number;
  hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
  datePickerValue: string | null;
  setDatePickerValue: (value: string | null) => void;
  completedDates: string[];
  addSelectedDate: (date: string) => void;
  projects: Project[];
  setProjects: (projec: Project) => void;
  deleteProject: (id: string) => void;
  isProjectModalOpen: boolean;
  setProjectModalOpen: (isOpen: boolean) => void;

  creatTodo: (todo: AddTodoType) => void;
}

export const useTodos = create<TodosStoreTypes>()(
  persist(
    (set) => ({
      todos: [],
      isProjectModalOpen: false,
      projects: [],
      hasHydrated: false,
      completedDates: [],
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      filter: "all",
      completeTodo: (id) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo,
          ),
        }));
      },
      setFilter: (filter) => {
        set({ filter });
      },
      creatTodo(todo) {
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: crypto.getRandomValues(new Uint8Array(5))?.toString(),
              title: todo.title.trim(),
              completed: false,
              createdAt: new Date().toISOString().split("T")[0],
              project: todo.project,
              subtasks: todo.subtasks,
              dueDate: todo.dueDate ? todo.dueDate  : null,
              isPomodoro: todo.isPomodoro,
              piority: todo.piority,
            },
          ],
        }));
      },

      deleteTodo: (id) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      },
      edit: null,
      setEdit: (id: string | null) => {
        set({
          edit: id,
        });
      },
      editTodo: (newtitle, id) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, title: newtitle } : todo,
          ),
        }));
      },
      markAllCompleted: () => {
        set((state) => ({
          todos: state.todos.map((todo) => ({ ...todo, completed: true })),
        }));
      },
      markAllUncompleted: () => {
        set((state) => ({
          todos: state.todos.map((todo) => ({ ...todo, completed: false })),
        }));
      },
      deleteAll: () => {
        set(() => ({
          todos: [],
        }));
      },
      CalcualteComletedPercentage: (todos) => {
        if (todos.length === 0) return 0;
        const completedTodos = todos.filter((todo) => todo.completed);

        return (completedTodos.length / todos.length) * 100;
      },

      datePickerValue: null,
      setDatePickerValue: (datePickerValue) => {
        set({
          datePickerValue: datePickerValue,
        });
      },
      addSelectedDate: (date) => {
        set((state) => {
          if (state.completedDates.includes(date)) {
            return state;
          }

          return {
            completedDates: [...state.completedDates, date],
          };
        });
      },

      setProjects: (project) => {
        set((state) => ({
          projects: [...state.projects, project],
        }));
      },
      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter((project) => project?.id != id),
        }));
      },
      setProjectModalOpen: (isOpen) => {
        set({ isProjectModalOpen: isOpen });
      },
    }),

    {
      name: "todos",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
