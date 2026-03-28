import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import type { TaskStatus } from "../types";

const STATUSES: TaskStatus[] = ["Pending", "In Progress", "Completed"];

function dotCls(s: TaskStatus) {
  if (s === "In Progress") return "sdot sd-prog";
  if (s === "Pending") return "sdot sd-pend";
  return "sdot sd-done";
}

interface StatusSelectProps {
  value: TaskStatus;
  onChange: (val: TaskStatus) => void;
}

export default function StatusSelect({ value, onChange }: StatusSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function h(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div className="ss-wrap" ref={ref}>
      <div
        className={`ss-trigger ${open ? "open" : ""}`}
        onClick={() => setOpen((p) => !p)}
      >
        <span className="ss-left">
          <span className={dotCls(value)} />
          {value}
        </span>
        <ChevronDown
          className={`ss-chev ${open ? "open" : ""}`}
          size={16}
          strokeWidth={2.5}
        />
      </div>
      {open && (
        <div className="ss-drop">
          {STATUSES.map((opt) => (
            <div
              key={opt}
              className={`ss-opt ${opt === value ? "sel" : ""}`}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              <span className={dotCls(opt)} />
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
