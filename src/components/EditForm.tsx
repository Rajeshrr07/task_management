import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import StatusSelect from "./StatusSelect";
import type { Task, TaskStatus } from "../types";
import { useTodoStore } from "../store/useTaskStore";

interface EditFormProps {
  task: Task;
  onBack: () => void;
}

export default function EditForm({ task, onBack }: EditFormProps) {
  const updateTask = useTodoStore((state) => state.updateTask);
  const [title, setTitle] = useState(task.title);
  const [desc, setDesc] = useState(task.description);
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [err, setErr] = useState(false);

  function handleUpdate() {
    if (!title.trim()) {
      setErr(true);
      setTimeout(() => setErr(false), 600);
      return;
    }
    updateTask(task.id, title.trim(), desc.trim(), status);
    onBack();
  }

  return (
    <>
      <header className="hdr-form">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={22} strokeWidth={2.5} />
        </button>
        <h1>Edit Task</h1>
      </header>
      <div className="form-body">
        <div>
          <input
            className={`field ${err ? "err" : ""}`}
            placeholder="Enter the title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErr(false);
            }}
          />
          {err && <p className="ferr">Title is required.</p>}
        </div>
        <textarea
          className="field"
          placeholder="Enter the description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <StatusSelect value={status} onChange={setStatus} />
        <div className="btn-row">
          <button className="btn btn-cancel" onClick={onBack}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </>
  );
}
