import { useState } from "react";
import { Search, Plus, ChevronDown } from "lucide-react";
import "./App.css";
import { useTodoStore } from "./store/useTaskStore";
import type { Task, TaskStatus } from "./types";
import TaskCard from "./components/TaskCard";
import AddForm from "./components/AddForm";
import EditForm from "./components/EditForm";

const CATEGORIES: TaskStatus[] = ["In Progress", "Pending", "Completed"];

export default function App() {
  const { tasks, deleteTask } = useTodoStore();

  const [view, setView] = useState<"list" | "add" | "edit">("list");
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [search, setSearch] = useState("");
  const [filter] = useState("All");

  const [expanded, setExpanded] = useState<Record<TaskStatus, boolean>>({
    "In Progress": true,
    Pending: false,
    Completed: false,
  });

  function toggle(cat: TaskStatus) {
    setExpanded((p) => ({ ...p, [cat]: !p[cat] }));
  }

  function goEdit(task: Task) {
    setEditTask(task);
    setView("edit");
  }

  function goBack() {
    setView("list");
    setEditTask(null);
  }

  function handleTaskAdded(status: TaskStatus) {
    setExpanded((p) => ({ ...p, [status]: true }));
  }

  function getList(status: TaskStatus) {
    return tasks.filter((t) => {
      const matchStatus = t.status === status;
      const matchFilter = filter === "All" || filter === status;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q);
      return matchStatus && matchFilter && matchSearch;
    });
  }

  return (
    <div className="shell">
      <div className="frame">
        {view === "add" && (
          <AddForm onBack={goBack} onAdded={handleTaskAdded} />
        )}

        {view === "edit" && editTask && (
          <EditForm task={editTask} onBack={goBack} />
        )}

        {view === "list" && (
          <>
            <header className="hdr">
              <h1>TODO APP</h1>
            </header>

            <div className="search-wrap">
              <Search className="search-icon" size={16} strokeWidth={2} />
              <input
                className="search-input"
                placeholder="Search To-Do"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="cats">
              {CATEGORIES.map((cat) => {
                if (filter !== "All" && filter !== cat) return null;
                const list = getList(cat);
                return (
                  <div className="cat-sec" key={cat}>
                    <div className="cat-hdr" onClick={() => toggle(cat)}>
                      <span className="cat-left">
                        {cat} <span className="cat-cnt">({list.length})</span>
                      </span>
                      <ChevronDown
                        className={`chev ${expanded[cat] ? "open" : ""}`}
                        size={18}
                        strokeWidth={2.5}
                      />
                    </div>
                    {expanded[cat] && (
                      <div className="task-list">
                        {list.length === 0 ? (
                          <p className="empty">No tasks here.</p>
                        ) : (
                          list.map((t) => (
                            <TaskCard
                              key={t.id}
                              task={t}
                              onEdit={goEdit}
                              onDelete={deleteTask}
                            />
                          ))
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              className="fab"
              onClick={() => setView("add")}
              aria-label="Add task"
            >
              <Plus size={24} strokeWidth={2.5} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
