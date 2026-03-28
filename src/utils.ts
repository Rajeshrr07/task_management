import type { Task } from "./types";

export const STORAGE_KEY = "todo_tasks_v1";

export const SEED: Task[] = [
  {
    id: "s1",
    title: "Lorem Ipsum",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    date: "Wed 31, July 2024",
    status: "In Progress",
    createdAt: 1,
  },
  {
    id: "s2",
    title: "Lorem Ipsum",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    date: "Wed 31, July 2024",
    status: "In Progress",
    createdAt: 2,
  },
  {
    id: "s3",
    title: "Design Review",
    description:
      "Review all UI components before the sprint demo with the client.",
    date: "Thu 1, August 2024",
    status: "Pending",
    createdAt: 3,
  },
  {
    id: "s4",
    title: "API Integration",
    description: "Connect the backend endpoints to the dashboard widgets.",
    date: "Fri 2, August 2024",
    status: "Pending",
    createdAt: 4,
  },
  {
    id: "s5",
    title: "Unit Tests",
    description: "Write Jest tests for core utility functions and hooks.",
    date: "Sat 3, August 2024",
    status: "Pending",
    createdAt: 5,
  },
  {
    id: "s6",
    title: "Meeting Notes",
    description:
      "Document outcomes and action items from the client kickoff call.",
    date: "Sun 4, August 2024",
    status: "Pending",
    createdAt: 6,
  },
  {
    id: "s7",
    title: "Deploy v1.2",
    description: "Successfully deployed v1.2 to production with zero downtime.",
    date: "Tue 30, July 2024",
    status: "Completed",
    createdAt: 7,
  },
  {
    id: "s8",
    title: "Login Flow Fix",
    description: "Bug fix for the auth redirect loop affecting Safari users.",
    date: "Mon 29, July 2024",
    status: "Completed",
    createdAt: 8,
  },
  {
    id: "s9",
    title: "Onboarding Revamp",
    description:
      "Redesigned the entire onboarding flow based on user feedback.",
    date: "Sun 28, July 2024",
    status: "Completed",
    createdAt: 9,
  },
  {
    id: "s10",
    title: "Analytics Dashboard",
    description: "Shipped the analytics dashboard with chart visualizations.",
    date: "Sat 27, July 2024",
    status: "Completed",
    createdAt: 10,
  },
  {
    id: "s11",
    title: "SEO Optimizations",
    description: "All meta tags, sitemaps, and structured data completed.",
    date: "Fri 26, July 2024",
    status: "Completed",
    createdAt: 11,
  },
];

export function loadTasks(): Task[] {
  try {
    const r = localStorage.getItem(STORAGE_KEY);
    if (r) return JSON.parse(r);
  } catch (_) {}
  return SEED;
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
