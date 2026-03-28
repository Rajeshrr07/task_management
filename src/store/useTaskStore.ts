import { create } from "zustand";
import type { Task, TaskStatus } from "../types/index";
import { loadTasks, saveTasks, uid, todayStr } from "../utils";

interface TodoStore {
  tasks: Task[];
  addTask: (title: string, desc: string, status: TaskStatus) => void;
  updateTask: (
    id: string,
    title: string,
    desc: string,
    status: TaskStatus
  ) => void;
  deleteTask: (id: string) => void;
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  tasks: loadTasks(),
  addTask: (title, desc, status) => {
    const newTask: Task = {
      id: uid(),
      title,
      description: desc,
      date: todayStr(),
      status,
      createdAt: Date.now(),
    };
    const nextTasks = [...get().tasks, newTask];
    saveTasks(nextTasks);
    set({ tasks: nextTasks });
  },
  updateTask: (id, title, desc, status) => {
    const nextTasks = get().tasks.map((t) =>
      t.id === id ? { ...t, title, description: desc, status } : t
    );
    saveTasks(nextTasks);
    set({ tasks: nextTasks });
  },
  deleteTask: (id) => {
    const nextTasks = get().tasks.filter((t) => t.id !== id);
    saveTasks(nextTasks);
    set({ tasks: nextTasks });
  },
}));
