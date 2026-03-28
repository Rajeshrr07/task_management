import type { Task } from "./types";

export const STORAGE_KEY = "todo_tasks_v1";

export function loadTasks(): Task[] {
  try {
    const r = localStorage.getItem(STORAGE_KEY);
    if (r) return JSON.parse(r);
  } catch (_) {}
  return [];
}

export function saveTasks(t: Task[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(t));
  } catch (_) {}
}

export function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function todayStr() {
  return new Date().toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
