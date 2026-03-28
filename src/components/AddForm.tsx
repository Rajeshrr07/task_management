import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import type { TaskStatus } from "../types";
import { useTodoStore } from "../store/useTaskStore";

interface AddFormProps {
  onBack: () => void;
  onAdded: (status: TaskStatus) => void;
}

export default function AddForm({ onBack, onAdded }: AddFormProps) {
  const addTask = useTodoStore((state) => state.addTask);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [status] = useState<TaskStatus>("Pending");
  const [err, setErr] = useState(false);

  function handleAdd() {
    if (!title.trim()) {
      setErr(true);
      setTimeout(() => setErr(false), 600);
      return;
    }
    addTask(title.trim(), desc.trim(), status);
    onAdded(status);
    onBack();
  }

  return (
    <>
      <header className="hdr-form">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={22} strokeWidth={2.5} />
        </button>
        <h1>Add Task</h1>
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
        <div className="btn-row">
          <button className="btn btn-cancel" onClick={onBack}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleAdd}>
            ADD
          </button>
        </div>
      </div>
    </>
  );
}
