import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import type { Task, TaskStatus } from "../types";

function badgeCls(s: TaskStatus) {
  if (s === "In Progress") return "badge b-prog";
  if (s === "Pending") return "badge b-pend";
  return "badge b-done";
}

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const [leaving, setLeaving] = useState(false);
  const done = task.status === "Completed";

  function handleDelete() {
    setLeaving(true);
    setTimeout(() => onDelete(task.id), 180);
  }

  return (
    <div className={`card ${leaving ? "out" : "in"}`}>
      <div className="avatar">{task.title.trim().charAt(0).toUpperCase()}</div>
      <div className="body">
        <div className="top-row">
          <span className={`tname ${done ? "done" : ""}`}>{task.title}</span>
          <span className={badgeCls(task.status)}>
            <span className="bdot" />
            {task.status}
          </span>
        </div>
        <p className={`tdesc ${done ? "done" : ""}`}>{task.description}</p>
        <div className="bot-row">
          <span className="tdate">{task.date}</span>
          <div className="actions">
            <button
              className="act-btn"
              onClick={() => onEdit(task)}
              title="Edit"
            >
              <Pencil size={15} strokeWidth={2} />
            </button>
            <button
              className="act-btn del"
              onClick={handleDelete}
              title="Delete"
            >
              <Trash2 size={15} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
