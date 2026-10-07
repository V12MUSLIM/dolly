import { TodoProps } from "@/app/components/todo/todo";
import { DateValue } from "@internationalized/date";
import { create } from "zustand";
import { persist } from "zustand/middleware";
export interface Project {
  id: string;
  name: string;
  slug:string;
  color: string;
}
export interface TodosStoreTypes {
  todos: TodoProps[];
  completeTodo: (id: TodoProps["id"]) => void;
  addTodo: (
    title: TodoProps["title"],
    dueDate: DateValue | null,
    subtasks: TodoProps["subtasks"],
  ) => void;
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
  selectProjectName: TodoProps["project"];
  setProjectName: (projectName: TodoProps["project"]) => void;
  hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
  datePickerValue: string | null;
  setDatePickerValue: (value: string | null) => void;
  selectPomodoro: "on" | "off";
  setPomodoro: (selectPomodoro: TodoProps["isPomodoro"]) => void;
  completedDates: string[];
  addSelectedDate: (date: string) => void;
  selectPiority: TodoProps["piority"];
  setPiority: (selectPiority: TodoProps["piority"]) => void;
  projects: Project[];
  setProjects: (projec: Project) => void;
  deleteProject: (id: string) => void;
  isProjectModalOpen: boolean;
  setProjectModalOpen: (isOpen: boolean) => void;
  
}

export const useTodos = create<TodosStoreTypes>()(
  persist(
    (set) => ({
      todos: [],

      isProjectModalOpen: false,
      selectProjectName: null,
      selectPiority: null,
      projects: [],
      hasHydrated: false,
      completedDates: [],
      selectPomodoro: "off",
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
      addTodo: (title, dueDate, subtasks) => {
        const trimmed = title.trim();

        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: crypto.getRandomValues(new Uint8Array(5))?.toString(),
              title: trimmed,
              completed: false,
              createdAt: new Date().toISOString(),
              project: state.selectProjectName,
              subtasks: subtasks,
              dueDate:
                dueDate || state.datePickerValue
                  ? dueDate?.toString() || state.datePickerValue
                  : null,
              isPomodoro: state.selectPomodoro,
              piority: state.selectPiority,
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
      setProjectName: (projectName) => {
        set(() => ({
          selectProjectName: projectName,
        }));
      },
      setPomodoro: (pomodoro: TodoProps["isPomodoro"]) => {
        set(() => ({
          selectPomodoro: pomodoro,
        }));
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
      setPiority: (selectPiority) => {
        set({
          selectPiority: selectPiority,
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
