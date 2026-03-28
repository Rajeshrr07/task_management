import React, { useState } from "react";
import TodoList from "./components/TodoList";
import AddTaskForm from "./components/AddTaskForm";
import EditTaskForm from "./components/EditTaskForm";
import { Task } from "./store/useTaskStore";
import "./components/AppShell.css";

type ViewMode = "list" | "add" | "edit";

const TodoApp: React.FC = () => {
  const [view, setView] = useState<ViewMode>("list");
  const [editTask, setEditTask] = useState<Task | null>(null);

  const handleAdd = () => setView("add");
  const handleEdit = (task: Task) => {
    setEditTask(task);
    setView("edit");
  };

  const handleBack = () => {
    setView("list");
    setEditTask(null);
  };

  return (
    <div className="app-shell">
      <div className="phone-frame">
        {view === "list" && <TodoList onAdd={handleAdd} onEdit={handleEdit} />}

        {view === "add" && <AddTaskForm onBack={handleBack} />}

        {view === "edit" && editTask && (
          <EditTaskForm task={editTask} onBack={handleBack} />
        )}
      </div>
    </div>
  );
};

export default TodoApp;
